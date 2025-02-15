import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { useLanguage } from "@/hooks/use-language";
import { BackButton } from "@/components/BackButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { countries, cities } from "@/lib/locations";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51Ow8kpHhvUXfFCfBwDSdJgVkLLpYcC71Z4nS0RH6kcwR4lmV2YRk6MpR0f13uHHGPBH3QkC9hoFW55G8hxFQKB8X00Tz2AGrjH');

const checkoutSchema = z.object({
  firstName: z.string().min(1, "Обязательное поле"),
  lastName: z.string().min(1, "Обязательное поле"),
  email: z.string().email("Некорректный email"),
  phone: z.string().min(1, "Обязательное поле"),
  country: z.string().min(1, "Выберите страну"),
  city: z.string().min(1, "Выберите город"),
  address: z.string().min(1, "Обязательное поле"),
  postalCode: z.string().min(1, "Обязательное поле"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const { currentLang, t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

const handlePayment = async (data: CheckoutFormData) => {
  try {
    setIsLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast({
        title: "Ошибка",
        description: "Необходимо войти в систему",
        variant: "destructive",
      });
      return;
    }

    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error("Stripe не загружен");
    }

    const response = await supabase.functions.invoke('create-payment-intent', {
      body: {
        items,
        deliveryInfo: data,
        userId: user.id,
      },
    });

    if (response.error) {
      console.error('Payment intent error:', response.error);
      throw new Error(response.error.message || 'Ошибка при создании платежа');
    }

    const { clientSecret, orderId } = response.data;

    if (!clientSecret) {
      throw new Error('Не получен ключ для оплаты');
    }

    const elements = stripe.elements({
      clientSecret,
      appearance: {
        theme: 'stripe',
      },
    });

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order/${orderId}`,
      },
    });

    if (result.error) {
      throw new Error(result.error.message || 'Ошибка при подтверждении платежа');
    }

    clearCart();
    navigate(`/order/${orderId}`);
  } catch (error) {
    console.error('Payment error:', error);
    toast({
      title: "Ошибка оплаты",
      description: error instanceof Error ? error.message : 'Произошла неожиданная ошибка',
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const availableCities = selectedCountry 
    ? cities[currentLang][selectedCountry as keyof typeof cities[typeof currentLang]] || [] 
    : [];

  return (
    <div className="min-h-screen bg-[#D3E4E0]/50 backdrop-blur-sm py-16">
      <BackButton />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-playfair text-tea-text mb-8">{t.checkout.title}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-medium mb-6">{t.checkout.recipientInfo}</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handlePayment)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.checkout.firstName}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.checkout.lastName}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.checkout.email}</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.checkout.phone}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.checkout.country}</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedCountry(value);
                          form.setValue('city', '');
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t.checkout.selectCountry} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <ScrollArea className="h-[200px]">
                            {countries[currentLang].map((country) => (
                              <SelectItem key={country.id} value={country.id}>
                                {country.name}
                              </SelectItem>
                            ))}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.checkout.city}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!selectedCountry}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t.checkout.selectCity} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <ScrollArea className="h-[300px] max-h-[50vh] overflow-y-auto">
                            {availableCities.map((city) => (
                              <SelectItem 
                                key={city.id} 
                                value={city.id}
                                className="cursor-pointer hover:bg-gray-100"
                              >
                                {city.name}
                              </SelectItem>
                            ))}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.checkout.address}</FormLabel>
                      <FormControl>
                        <Input placeholder={t.checkout.addressPlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.checkout.postalCode}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit"
                  className="w-full bg-tea-brown hover:bg-tea-brown/90 mt-8"
                  disabled={isLoading}
                >
                  {isLoading ? "Обработка..." : `${t.checkout.pay} ${totalAmount} €`}
                </Button>
              </form>
            </Form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-medium mb-6">{t.checkout.yourOrder}</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div 
                  key={`${item.id}-${item.selectedSize}`} 
                  className="flex items-center gap-4 py-4 border-b last:border-0"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    {item.category === 'tea' && item.selectedSize && (
                      <p className="text-sm text-gray-500">{item.selectedSize} г</p>
                    )}
                    <p className="text-sm text-gray-500">{t.checkout.quantity}: {item.quantity}</p>
                  </div>
                  <p className="text-tea-brown">{item.price * item.quantity} €</p>
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center font-medium">
                  <span>{t.checkout.orderTotal}:</span>
                  <span className="text-tea-brown text-lg">{totalAmount} €</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

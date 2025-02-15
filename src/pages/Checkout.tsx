
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { useLanguage } from "@/hooks/use-language";
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
import { countries, cities } from "@/lib/location-data";
import { useState } from "react";

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { items } = useCart();
  const { currentLang } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const form = useForm<CheckoutFormData>();

  const handlePayment = async (data: CheckoutFormData) => {
    console.log("Order data:", { items, deliveryInfo: data });
    // Здесь будет интеграция с платежной системой
  };

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const availableCities = selectedCountry ? cities[currentLang][selectedCountry as keyof typeof cities[typeof currentLang]] || [] : [];

  return (
    <div className="min-h-screen bg-[#D3E4E0]/50 backdrop-blur-sm py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-playfair text-tea-text mb-8">Оформление заказа</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-medium mb-6">Информация о получателе</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handlePayment)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Имя</FormLabel>
                        <FormControl>
                          <Input placeholder="Иван" {...field} />
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
                        <FormLabel>Фамилия</FormLabel>
                        <FormControl>
                          <Input placeholder="Иванов" {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="example@mail.com" {...field} />
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
                      <FormLabel>Телефон</FormLabel>
                      <FormControl>
                        <Input placeholder="+7 (999) 999-99-99" {...field} />
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
                      <FormLabel>Страна</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedCountry(value);
                          form.setValue('city', ''); // Сброс города при смене страны
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите страну" />
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
                      <FormLabel>Город</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!selectedCountry}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите город" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <ScrollArea className="h-[200px]">
                            {availableCities.map((city) => (
                              <SelectItem key={city.id} value={city.id}>
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
                      <FormLabel>Адрес</FormLabel>
                      <FormControl>
                        <Input placeholder="Улица, дом, квартира" {...field} />
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
                      <FormLabel>Индекс</FormLabel>
                      <FormControl>
                        <Input placeholder="123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit"
                  className="w-full bg-tea-brown hover:bg-tea-brown/90 mt-8"
                >
                  Оплатить {totalAmount} €
                </Button>
              </form>
            </Form>
          </div>

          {/* Список товаров */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-medium mb-6">Ваш заказ</h2>
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
                    <p className="text-sm text-gray-500">Количество: {item.quantity}</p>
                  </div>
                  <p className="text-tea-brown">{item.price * item.quantity} €</p>
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center font-medium">
                  <span>Итого:</span>
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

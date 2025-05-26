
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const DatabaseTest = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setTestResult('');
    
    try {
      console.log('Testing Supabase connection...');
      
      // Test basic connection
      const { data, error } = await supabase
        .from('teas')
        .select('count')
        .limit(1);
      
      if (error) {
        console.error('Connection test failed:', error);
        setTestResult(`Ошибка соединения: ${error.message}`);
      } else {
        console.log('Connection test successful:', data);
        setTestResult('Соединение с базой данных работает!');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setTestResult(`Неожиданная ошибка: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Тест соединения с БД</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testConnection} disabled={loading}>
          {loading ? 'Тестирование...' : 'Тест соединения'}
        </Button>
        {testResult && (
          <div className={`p-3 rounded ${testResult.includes('Ошибка') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {testResult}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

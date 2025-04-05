
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectItem } from '@/components/ui/select';
import { format } from 'date-fns';
import { Bar } from 'react-chartjs-2';

export default function AccountingDashboard() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    name: '',
    type: 'in',
    amount: '',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd'),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    const updated = [...transactions, { ...form, amount: parseFloat(form.amount) }];
    setTransactions(updated);
    setForm({ ...form, amount: '', description: '' });
  };

  const balance = transactions.reduce((acc, t) => {
    return t.type === 'in' ? acc + t.amount : acc - t.amount;
  }, 0);

  const chartData = {
    labels: transactions.map((t) => t.date),
    datasets: [
      {
        label: 'Transactions',
        data: transactions.map((t) => (t.type === 'in' ? t.amount : -t.amount)),
        backgroundColor: transactions.map((t) => (t.type === 'in' ? 'green' : 'red')),
      },
    ],
  };

  return (
    <div className="p-4 grid gap-4">
      <Card>
        <CardContent className="grid grid-cols-2 gap-4 p-4">
          <Input name="name" placeholder="Customer/Owner Name" value={form.name} onChange={handleChange} />
          <Select name="type" value={form.type} onValueChange={(value) => setForm((f) => ({ ...f, type: value }))}>
            <SelectItem value="in">Money In</SelectItem>
            <SelectItem value="out">Money Out</SelectItem>
          </Select>
          <Input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} />
          <Input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          <Input name="date" type="date" value={form.date} onChange={handleChange} />
          <Button onClick={handleAdd}>Add Transaction</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">Balance: ₹{balance.toFixed(2)}</h2>
          <div className="overflow-auto max-h-64">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, i) => (
                  <tr key={i} className="border-t">
                    <td>{t.date}</td>
                    <td>{t.name}</td>
                    <td>{t.type}</td>
                    <td>{t.amount}</td>
                    <td>{t.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-2">Transaction Chart</h2>
          <Bar data={chartData} />
        </CardContent>
      </Card>
    </div>
  );
}

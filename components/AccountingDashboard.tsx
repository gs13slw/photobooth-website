"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Download, Plus, Trash2 } from "lucide-react";

interface IncomeRow { id: string; date: number; amount: number; name?: string; eventDate?: string; }
interface ExpenseRow { id: string; date: string; category: string; amount: number; note?: string; createdAt: number; }

const CATEGORIES = ["Supplies", "Equipment", "Travel / Mileage", "Marketing", "Software / Subscriptions", "Insurance", "Other"];
const STORAGE_KEY = "lasting-moments-expenses";

function money(value: number) {
	return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value || 0);
}

export default function AccountingDashboard({ income = [] }: { income?: IncomeRow[] }) {
	const [expenses, setExpenses] = useState<ExpenseRow[]>([]);
	const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
	const [category, setCategory] = useState(CATEGORIES[0]);
	const [amount, setAmount] = useState("");
	const [note, setNote] = useState("");

	useEffect(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) setExpenses(JSON.parse(saved));
		} catch { setExpenses([]); }
	}, []);

	useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses)); }, [expenses]);

	const totals = useMemo(() => {
		const incomeTotal = income.reduce((sum, row) => sum + Number(row.amount || 0), 0);
		const expenseTotal = expenses.reduce((sum, row) => sum + Number(row.amount || 0), 0);
		return { incomeTotal, expenseTotal, net: incomeTotal - expenseTotal };
	}, [income, expenses]);

	function addExpense(event: FormEvent) {
		event.preventDefault();
		const value = Number(amount);
		if (!date || !Number.isFinite(value) || value <= 0) return;
		setExpenses((current) => [{ id: `${Date.now()}-${Math.random()}`, date, category, amount: value, note: note.trim() || undefined, createdAt: Date.now() }, ...current]);
		setAmount(""); setNote("");
	}

	function exportCsv() {
		const rows = [["Date", "Category", "Amount", "Note"], ...expenses.map((row) => [row.date, row.category, row.amount.toFixed(2), row.note || ""])]
			.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","));
		const url = URL.createObjectURL(new Blob([rows.join("\n")], { type: "text/csv" }));
		const link = document.createElement("a"); link.href = url; link.download = "accounting-expenses.csv"; link.click(); URL.revokeObjectURL(url);
	}

	return <section className="space-y-6 rounded-xl bg-white p-6 shadow-sm">
		<header className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-2xl font-semibold">Accounting</h2><p className="text-sm text-gray-500">Track income and business expenses.</p></div><button type="button" onClick={exportCsv} className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"><Download size={16} /> Export CSV</button></header>
		<div className="grid gap-4 sm:grid-cols-3">{[["Income", totals.incomeTotal, "text-green-700"], ["Expenses", totals.expenseTotal, "text-red-700"], ["Net", totals.net, "text-indigo-700"]].map(([label, value, color]) => <div key={label as string} className="rounded-lg bg-gray-50 p-4"><p className="text-sm text-gray-500">{label}</p><p className={`text-xl font-semibold ${color}`}>{money(value as number)}</p></div>)}</div>
		<form onSubmit={addExpense} className="grid gap-3 rounded-lg border p-4 sm:grid-cols-5"><input required type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-lg border px-3 py-2 text-sm" /><select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">{CATEGORIES.map((item) => <option key={item}>{item}</option>)}</select><input required min="0.01" step="0.01" type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="rounded-lg border px-3 py-2 text-sm" /><input placeholder="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} className="rounded-lg border px-3 py-2 text-sm" /><button className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white"><Plus size={16} /> Add expense</button></form>
		<div className="divide-y rounded-lg border">{expenses.length === 0 ? <p className="p-6 text-center text-sm text-gray-500">No expenses recorded yet.</p> : expenses.map((row) => <div key={row.id} className="flex items-center justify-between gap-3 p-4"><div><p className="font-medium">{row.category} <span className="font-normal text-gray-500">· {row.date}</span></p><p className="text-sm text-gray-500">{row.note || "No note"}</p></div><div className="flex items-center gap-3"><strong>{money(row.amount)}</strong><button type="button" aria-label="Delete expense" onClick={() => setExpenses((current) => current.filter((item) => item.id !== row.id))} className="text-red-600"><Trash2 size={17} /></button></div></div>)}</div>
	</section>;
}

import React from "react";
import { getFundBalance } from "@/lib/fund";
import Link from "next/link";

const verificationQueue = [
	{ user: "Sophie M.", type: "Host Home", country: "FR", submitted: "2h ago", status: "Manual review" },
	{ user: "Luca B.", type: "ID + Address", country: "IT", submitted: "5h ago", status: "Match OK" },
	{ user: "Eva K.", type: "Address", country: "DE", submitted: "1d ago", status: "Mismatch" },
	{ user: "Jonas R.", type: "Host Home", country: "SE", submitted: "1d ago", status: "Docs OK" },
];

const claimsQueue = [
	{ id: 482, host: "M. Duarte", country: "PT", amount: "€180" },
	{ id: 479, host: "A. Weber", country: "DE", amount: "€420" },
	{ id: 476, host: "I. Rossi", country: "IT", amount: "€90" },
	{ id: 471, host: "S. Novak", country: "SI", amount: "€510" },
];

const moderationReports = [
	{ id: 2207, desc: "Harassment in messages", country: "IE", status: "New" },
	{ id: 2201, desc: "Photos misleading", country: "NL", status: "In review" },
	{ id: 2198, desc: "Late cancellation (<15d)", country: "ES", status: "Actioned" },
];

export default async function AdminDashboard() {
	const fundBalance = await getFundBalance();
	const metrics = [
		{ label: "Active Members", value: "12,480", change: "+6.4% MoM" },
		{ label: "Verified Homes", value: "3,215", change: "+4.1% MoM" },
		{ label: "Bookings (1-3m)", value: "1,042", change: "-8.7% MoM" },
		{ label: "Fund Balance", value: `€ ${fundBalance.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}`, change: "" },
	];
	return (
		<div className="flex min-h-screen bg-gray-50">
			{/* Sidebar */}
			<aside className="w-64 bg-white border-r p-6 flex flex-col gap-2">
				<h2 className="font-bold text-lg mb-6">HomePass Admin</h2>
				<nav className="flex flex-col gap-2">
					<Link href="/admin-backoffice/dashboard" className="py-2 px-3 rounded hover:bg-gray-100 font-medium">Dashboard</Link>
					<Link href="/admin-backoffice/users" className="py-2 px-3 rounded hover:bg-gray-100">Users</Link>
					<Link href="/admin-backoffice/listings" className="py-2 px-3 rounded hover:bg-gray-100">Listings</Link>
					<Link href="/admin-backoffice/bookings" className="py-2 px-3 rounded hover:bg-gray-100">Bookings</Link>
					<Link href="/admin-backoffice/claims" className="py-2 px-3 rounded hover:bg-gray-100">Claims</Link>
					<Link href="/admin-backoffice/fund" className="py-2 px-3 rounded hover:bg-gray-100">Fund</Link>
					<Link href="/admin-backoffice/moderation" className="py-2 px-3 rounded hover:bg-gray-100">Moderation</Link>
					<Link href="/admin-backoffice/reports" className="py-2 px-3 rounded hover:bg-gray-100">Reports</Link>
					<Link href="/admin-backoffice/settings" className="py-2 px-3 rounded hover:bg-gray-100">Settings</Link>
				</nav>
			</aside>
			{/* Main Content */}
			<main className="flex-1 p-8">
				<h1 className="text-2xl font-bold mb-6">Dashboard — Overview</h1>
				{/* Metrics */}
				<div className="grid grid-cols-4 gap-6 mb-8">
					{metrics.map((m) => (
						<div key={m.label} className="bg-white rounded shadow p-6 flex flex-col items-start">
							<div className="text-gray-500 text-sm mb-2">{m.label}</div>
							<div className="text-2xl font-bold mb-1">{m.value}</div>
							{m.change && <div className="text-xs text-green-600">{m.change}</div>}
						</div>
					))}
				</div>
				<div className="grid grid-cols-2 gap-6 mb-8">
					{/* Verification Queue */}
					<div className="bg-white rounded shadow p-6">
						<div className="font-bold mb-2">Verification Queue</div>
						<table className="w-full text-sm">
							<thead>
								<tr className="text-gray-500">
									<th className="text-left">User</th>
									<th className="text-left">Type</th>
									<th className="text-left">Country</th>
									<th className="text-left">Submitted</th>
									<th className="text-left">Status</th>
								</tr>
							</thead>
							<tbody>
								{verificationQueue.map((v) => (
									<tr key={v.user}>
										<td>{v.user}</td>
										<td>{v.type}</td>
										<td>{v.country}</td>
										<td>{v.submitted}</td>
										<td>{v.status}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					{/* Claims Queue */}
					<div className="bg-white rounded shadow p-6">
						<div className="font-bold mb-2">Fund — Claims Queue</div>
						<table className="w-full text-sm">
							<thead>
								<tr className="text-gray-500">
									<th className="text-left">Claim</th>
									<th className="text-left">Host</th>
									<th className="text-left">Country</th>
									<th className="text-left">Amount</th>
								</tr>
							</thead>
							<tbody>
								{claimsQueue.map((c) => (
									<tr key={c.id}>
										<td>#{c.id}</td>
										<td>{c.host}</td>
										<td>{c.country}</td>
										<td>{c.amount}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<div className="grid grid-cols-3 gap-6">
					{/* Moderation Reports */}
					<div className="bg-white rounded shadow p-6">
						<div className="font-bold mb-2">Moderation — Reports</div>
						<ul className="text-sm">
							{moderationReports.map((r) => (
								<li key={r.id} className="mb-1">
									<span className="font-mono">#{r.id}</span> {r.desc} <span className="text-gray-500">({r.country})</span> <span className="ml-2 px-2 py-1 rounded text-xs bg-gray-200">{r.status}</span>
								</li>
							))}
						</ul>
					</div>
					{/* Activity */}
					<div className="bg-white rounded shadow p-6">
						<div className="font-bold mb-2">Activity — Last 24h</div>
						<ul className="text-sm">
							<li>+38 New members</li>
							<li>+12 Homes listed (draft/active)</li>
							<li>+57 Messages sent</li>
							<li>+19 Booking requests</li>
							<li>5 Manual verifications</li>
						</ul>
					</div>
					{/* Fund Health Snapshot (mocked graph) */}
					<div className="bg-white rounded shadow p-6">
						<div className="font-bold mb-2">Fund — Health Snapshot</div>
						<div className="flex items-end gap-2 h-24">
							<div className="bg-green-400 w-8" style={{height: '60%'}}></div>
							<div className="bg-blue-400 w-8" style={{height: '80%'}}></div>
							<div className="bg-green-400 w-8" style={{height: '40%'}}></div>
						</div>
						<div className="text-xs text-gray-500 mt-2">Month -2, Month -1, Month 0</div>
					</div>
				</div>
			</main>
		</div>
	);
}

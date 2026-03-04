import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ clienti }) {
    const [selectedCliente, setSelectedCliente] = useState(null);

    const confirmDelete = (cliente) => setSelectedCliente(cliente);

    const handleDelete = () => {
        router.delete(route('clienti.destroy', selectedCliente.id), {
            onSuccess: () => setSelectedCliente(null),
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Clienti</h2>}>
            <Head title="Clienti" />

            <div className="py-8 px-4 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Lista Clienti</h3>
                    <Link href={route('clienti.create')} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                        + Nuovo Cliente
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="text-left px-4 py-3">Ragione Sociale</th>
                                <th className="text-left px-4 py-3">Email</th>
                                <th className="text-left px-4 py-3">Telefono</th>
                                <th className="text-left px-4 py-3">Partita IVA</th>
                                <th className="text-left px-4 py-3">Azioni</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clienti.map(c => (
                                <tr key={c.id} className="border-t">
                                    <td className="px-4 py-3">{c.ragione_sociale}</td>
                                    <td className="px-4 py-3">{c.email}</td>
                                    <td className="px-4 py-3">{c.telefono}</td>
                                    <td className="px-4 py-3">{c.partita_iva}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <Link href={route('clienti.edit', c.id)} className="bg-yellow-500 text-white px-3 py-1 rounded text-xs hover:bg-yellow-600">
                                                Modifica
                                            </Link>
                                            <button onClick={() => confirmDelete(c)} className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600">
                                                Elimina
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedCliente && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold mb-2">Conferma Eliminazione</h3>
                        <p className="text-gray-600 mb-6">
                            Sei sicuro di voler eliminare <strong>{selectedCliente.ragione_sociale}</strong>?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setSelectedCliente(null)} className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-50">
                                Annulla
                            </button>
                            <button onClick={handleDelete} className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600">
                                Elimina
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
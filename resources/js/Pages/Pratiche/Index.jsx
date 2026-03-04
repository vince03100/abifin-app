import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

const statoColor = {
    'Aperta': 'bg-red-100 text-red-700',
    'In Lavorazione': 'bg-yellow-100 text-yellow-700',
    'Chiusa': 'bg-green-100 text-green-700',
};

export default function Index({ pratiche }) {
    const { auth } = usePage().props;
    const isAdmin = auth.user.role === 'admin';
    const [selected, setSelected] = useState(null);

    const handleDelete = () => {
        router.delete(route('pratiche.destroy', selected.id), {
            onSuccess: () => setSelected(null),
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Pratiche</h2>}>
            <Head title="Pratiche" />

            <div className="py-8 px-4 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Lista Pratiche</h3>
                    {isAdmin && (
                        <Link href={route('pratiche.create')} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                            + Nuova Pratica
                        </Link>
                    )}
                </div>

                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="text-left px-4 py-3">Titolo</th>
                                <th className="text-left px-4 py-3">Cliente</th>
                                <th className="text-left px-4 py-3">Stato</th>
                                <th className="text-left px-4 py-3">Data Apertura</th>
                                {isAdmin && <th className="text-left px-4 py-3">Azioni</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {pratiche.map(p => (
                                <tr key={p.id} className="border-t">
                                    <td className="px-4 py-3">{p.titolo}</td>
                                    <td className="px-4 py-3">{p.cliente?.ragione_sociale}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statoColor[p.stato]}`}>
                                            {p.stato}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">{new Date(p.data_apertura).toLocaleDateString('it-IT')}</td>
                                    {isAdmin && (
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <Link href={route('pratiche.edit', p.id)} className="bg-yellow-500 text-white px-3 py-1 rounded text-xs hover:bg-yellow-600">
                                                    Modifica
                                                </Link>
                                                <button onClick={() => setSelected(p)} className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600">
                                                    Elimina
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selected && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold mb-2">Conferma Eliminazione</h3>
                        <p className="text-gray-600 mb-6">
                            Sei sicuro di voler eliminare <strong>{selected.titolo}</strong>?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-50">
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
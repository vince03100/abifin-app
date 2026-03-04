import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button, Input } from '@heroui/react';

const stati = ['Aperta', 'In Lavorazione', 'Chiusa'];

export default function Edit({ pratica, clienti }) {
    const { data, setData, put, processing, errors } = useForm({
        cliente_id: pratica.cliente_id,
        titolo: pratica.titolo,
        descrizione: pratica.descrizione ?? '',
        stato: pratica.stato,
    });

    const submit = () => {
        put(route('pratiche.update', pratica.id));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Modifica Pratica</h2>}>
            <Head title="Modifica Pratica" />

            <div className="py-8 px-4 max-w-2xl mx-auto">
                <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Cliente</label>
                        <select
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.cliente_id}
                            onChange={e => setData('cliente_id', e.target.value)}
                        >
                            <option value="">Seleziona cliente</option>
                            {clienti.map(c => (
                                <option key={c.id} value={c.id}>{c.ragione_sociale}</option>
                            ))}
                        </select>
                        {errors.cliente_id && <span className="text-red-500 text-xs">{errors.cliente_id}</span>}
                    </div>

                   <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">Titolo</label>
    <input
        type="text"
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={data.titolo}
        onChange={e => setData('titolo', e.target.value)}
    />
    {errors.titolo && <span className="text-red-500 text-xs">{errors.titolo}</span>}
</div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Descrizione</label>
                        <textarea
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                            value={data.descrizione}
                            onChange={e => setData('descrizione', e.target.value)}
                        />
                        {errors.descrizione && <span className="text-red-500 text-xs">{errors.descrizione}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Stato</label>
                        <select
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.stato}
                            onChange={e => setData('stato', e.target.value)}
                        >
                            {stati.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        {errors.stato && <span className="text-red-500 text-xs">{errors.stato}</span>}
                    </div>

                    <Button color="primary" onPress={submit} isLoading={processing}>
                        Salva Modifiche
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
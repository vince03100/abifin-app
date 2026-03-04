import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@heroui/react';

const Field = ({ label, error, children }) => (
    <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {children}
        {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
);

export default function Edit({ cliente }) {
    const { data, setData, put, processing, errors } = useForm({
        ragione_sociale: cliente.ragione_sociale,
        email: cliente.email,
        telefono: cliente.telefono,
        indirizzo: cliente.indirizzo,
        partita_iva: cliente.partita_iva,
    });

    const inputClass = "border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

    const submit = () => put(route('clienti.update', cliente.id));

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Modifica Cliente</h2>}>
            <Head title="Modifica Cliente" />
            <div className="py-8 px-4 max-w-2xl mx-auto">
                <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
                    <Field label="Ragione Sociale" error={errors.ragione_sociale}>
                        <input className={inputClass} value={data.ragione_sociale} onChange={e => setData('ragione_sociale', e.target.value)} />
                    </Field>
                    <Field label="Email" error={errors.email}>
                        <input className={inputClass} type="email" value={data.email} onChange={e => setData('email', e.target.value)} />
                    </Field>
                    <Field label="Telefono" error={errors.telefono}>
                        <input className={inputClass} value={data.telefono} onChange={e => setData('telefono', e.target.value)} />
                    </Field>
                    <Field label="Indirizzo" error={errors.indirizzo}>
                        <input className={inputClass} value={data.indirizzo} onChange={e => setData('indirizzo', e.target.value)} />
                    </Field>
                    <Field label="Partita IVA" error={errors.partita_iva}>
                        <input className={inputClass} value={data.partita_iva} onChange={e => setData('partita_iva', e.target.value)} />
                    </Field>
                    <Button color="primary" onPress={submit} isLoading={processing}>
                        Salva Modifiche
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
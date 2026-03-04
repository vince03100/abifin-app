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

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        ragione_sociale: '',
        email: '',
        telefono: '',
        indirizzo: '',
        partita_iva: '',
    });

    const inputClass = "border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

    const submit = () => post(route('clienti.store'));

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Nuovo Cliente</h2>}>
            <Head title="Nuovo Cliente" />
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
                        Crea Cliente
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
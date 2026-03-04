import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardBody, Chip } from '@heroui/react';

const statoColore = {
    'Aperta': 'success',
    'In Lavorazione': 'warning',
    'Chiusa': 'danger',
};

export default function Dashboard({
    isAdmin,
    totaleClienti,
    totalePratiche,
    pratichePerStato,
    ultimi5Clienti,
    ultime5Pratiche,
    pratiche,
}) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Dashboard</h2>}>
            <Head title="Dashboard" />

            <div className="py-8 px-6 max-w-7xl mx-auto">
                {isAdmin ? (
                    <>
                        {/* Statistiche */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <Card>
                                <CardBody>
                                    <p className="text-sm text-gray-500">Totale Clienti</p>
                                    <p className="text-3xl font-bold">{totaleClienti}</p>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <p className="text-sm text-gray-500">Totale Pratiche</p>
                                    <p className="text-3xl font-bold">{totalePratiche}</p>
                                </CardBody>
                            </Card>
                            {pratichePerStato.map(p => (
                                <Card key={p.stato}>
                                    <CardBody>
                                        <p className="text-sm text-gray-500">{p.stato}</p>
                                        <p className="text-3xl font-bold">{p.totale}</p>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>

                        {/* Ultimi clienti */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardBody>
                                    <h3 className="font-semibold mb-4">Ultimi 5 Clienti</h3>
                                    <div className="space-y-2">
                                        {ultimi5Clienti.map(c => (
                                            <div key={c.id} className="flex justify-between text-sm">
                                                <span>{c.ragione_sociale}</span>
                                                <span className="text-gray-400">{c.email}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardBody>
                            </Card>

                            <Card>
                                <CardBody>
                                    <h3 className="font-semibold mb-4">Ultime 5 Pratiche Aperte</h3>
                                    <div className="space-y-2">
                                        {ultime5Pratiche.map(p => (
                                            <div key={p.id} className="flex justify-between text-sm">
                                                <span>{p.titolo}</span>
                                                <Chip size="sm" color={statoColore[p.stato]}>{p.stato}</Chip>
                                            </div>
                                        ))}
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Dashboard Cliente */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {pratichePerStato.map(p => (
                                <Card key={p.stato}>
                                    <CardBody>
                                        <p className="text-sm text-gray-500">{p.stato}</p>
                                        <p className="text-3xl font-bold">{p.totale}</p>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>

                        <Card>
                            <CardBody>
                                <h3 className="font-semibold mb-4">Le mie Pratiche</h3>
                                <div className="space-y-2">
                                    {pratiche.map(p => (
                                        <div key={p.id} className="flex justify-between text-sm">
                                            <span>{p.titolo}</span>
                                            <Chip size="sm" color={statoColore[p.stato]}>{p.stato}</Chip>
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
import React from 'react';

const Ticket = ({ order, ticketRef }) => {
    if (!order) return null;

    return (
        <div
            ref={ticketRef}
            className="p-10 bg-white text-gray-900 w-[700px] border border-gray-200"
            style={{
                backgroundColor: 'white',
                minHeight: '800px',
                padding: '40px'
            }}
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-8 border-b pb-6" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1.5rem' }}>
                <div>
                    <div style={{ width: '48px', height: '48px', backgroundColor: 'black', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '20px', marginBottom: '8px' }}>A</div>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>AICOR</h1>
                    <p style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', letterSpacing: '2px', margin: '0' }}>Tecnología y Soluciones</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#999', textTransform: 'uppercase', margin: '0 0 4px' }}>Recibo de Pedido</h2>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '0' }}>{order.id}</p>
                    <p style={{ fontSize: '12px', color: '#666', margin: '0' }}>{order.date}</p>
                </div>
            </div>

            {/* Customer Info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div>
                    <h3 style={{ fontSize: '10px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', margin: '0 0 4px' }}>Cliente</h3>
                    <p style={{ fontSize: '14px', fontWeight: '600', margin: '0' }}>{order.user_name || 'Invitado'}</p>
                    <p style={{ fontSize: '12px', color: '#666', margin: '0' }}>{order.user_email}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <h3 style={{ fontSize: '10px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', margin: '0 0 4px' }}>Método de Pago</h3>
                    <p style={{ fontSize: '14px', fontWeight: '600', margin: '0' }}>{order.payment_method || 'Tarjeta'}</p>
                </div>
            </div>

            {/* Items Table */}
            <table style={{ width: '100%', marginBottom: '2rem', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <th style={{ padding: '8px 0', fontSize: '10px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase' }}>Producto</th>
                        <th style={{ padding: '8px 0', fontSize: '10px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', textAlign: 'center' }}>Cant.</th>
                        <th style={{ padding: '8px 0', fontSize: '10px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', textAlign: 'right' }}>Precio</th>
                        <th style={{ padding: '8px 0', fontSize: '10px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', textAlign: 'right' }}>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items && order.items.map((item, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #f9f9f9' }}>
                            <td style={{ padding: '12px 0', fontSize: '14px', fontWeight: '500' }}>{item.name}</td>
                            <td style={{ padding: '12px 0', fontSize: '14px', textAlign: 'center' }}>{item.quantity}</td>
                            <td style={{ padding: '12px 0', fontSize: '14px', textAlign: 'right' }}>{parseFloat(item.price).toFixed(2)}€</td>
                            <td style={{ padding: '12px 0', fontSize: '14px', fontWeight: '600', textAlign: 'right' }}>{parseFloat(item.subtotal || item.price * item.quantity).toFixed(2)}€</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Summary */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
                <div style={{ width: '50%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                        <span style={{ color: '#666' }}>Subtotal</span>
                        <span style={{ fontWeight: '500' }}>{parseFloat(order.total).toFixed(2)}€</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                        <span style={{ color: '#666' }}>Envío</span>
                        <span style={{ color: '#059669', fontWeight: '500' }}>Gratis</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #eee' }}>
                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>TOTAL</span>
                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{parseFloat(order.total).toFixed(2)}€</span>
                    </div>
                </div>
            </div>

            {/* Footer Note */}
            <div style={{ backgroundColor: '#f9f9f9', padding: '24px', borderRadius: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: '14px', fontWeight: 'bold', margin: '0 0 4px' }}>Recogida en 48/72 horas</p>
                <p style={{ fontSize: '12px', color: '#666', margin: '0' }}>Punto de entrega: Aicor Córdoba</p>
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #eee' }}>
                    <p style={{ fontSize: '10px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.5' }}>
                        Gracias por confiar en AICOR para tus soluciones tecnológicas.<br />
                        Este documento es un comprobante de compra válido.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Ticket;

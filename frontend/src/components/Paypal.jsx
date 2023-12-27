import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { createOrder, emptyCart, resetState } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// This value is from the props in the UI
const style = { layout: 'vertical' };

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ currency, showSpinner, amount, payload, setIsSuccess }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [{ isPending }] = usePayPalScriptReducer();

    const { shippingInfo, orderItems, totalPrice, totalPriceAfterDiscount } = payload;

    const handleCreateOrder = () => {
        dispatch(
            createOrder({
                shippingInfo,
                orderItems,
                totalPrice,
                totalPriceAfterDiscount,
                payment: 'Đã thanh toán qua PayPal',
            }),
        );
    };

    return (
        <>
            {showSpinner && isPending && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style, currency, amount]}
                fundingSource={undefined}
                createOrder={(data, actions) =>
                    actions.order
                        .create({
                            purchase_units: [{ amount: { currency_code: currency, value: amount } }],
                        })
                        .then((orderId) => orderId)
                }
                onApprove={(data, actions) =>
                    actions.order.capture().then(async (response) => {
                        if (response.status === 'COMPLETED') {
                            handleCreateOrder();
                            setTimeout(() => {
                                setIsSuccess(true);
                                Swal.fire('Chúc mừng!', 'Thanh toán thành công', 'success').then(() => {
                                    dispatch(emptyCart());
                                    dispatch(resetState());
                                    navigate('/order');
                                });
                            }, 1000);
                        }
                    })
                }
            />
        </>
    );
};

export default function Paypal({ amount, payload, setIsSuccess }) {
    return (
        <div style={{ width: '100%', height: 'auto' }}>
            <PayPalScriptProvider options={{ clientId: 'test', components: 'buttons', currency: 'USD' }}>
                <ButtonWrapper
                    payload={payload}
                    currency={'USD'}
                    amount={amount}
                    setIsSuccess={setIsSuccess}
                    showSpinner={false}
                />
            </PayPalScriptProvider>
        </div>
    );
}

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Payment = ({ clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handlePayment = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Confirm the payment using the client secret and card details
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                throw new Error(result.error.message);
            }

            // Payment successful
            setSuccess(true);
        } catch (error) {
            setError(error.message || 'Failed to process payment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>Payment Page</h2>
            <form onSubmit={handlePayment}>
                <CardElement />
                <button type="submit" disabled={!stripe || loading}>
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
            </form>
            {error && <p>{error}</p>}
            {success && <p>Payment successful!</p>}
        </div>
    );
};

const WrappedPayment = ({ clientSecret }) => (
    <Elements stripe={stripePromise}>
        <Payment clientSecret={clientSecret} />
    </Elements>
);

export default Payment;
import { useState, useEffect } from 'react';

function CountdownTimer({ promoDetails }) {
    const [countdownText, setCountdownText] = useState('');

    useEffect(() => {
        if (promoDetails && promoDetails.validUntil) {
            const countDownDate = new Date(promoDetails.validUntil).getTime();

            const timerInterval = setInterval(() => {
                const now = new Date().getTime();
                const distance = countDownDate - now;
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));

                if (distance < 0) {
                    clearInterval(timerInterval);
                    setCountdownText('EXPIRED');
                } else if (days <= 0) {
                    setCountdownText('Expires today');
                } else {
                    setCountdownText(`Expire in ${days} days`);
                }
            }, 1000);

            return () => {
                clearInterval(timerInterval);
            };
        }
    }, [promoDetails]);

    return <span className='md:text-sm text-xs'> {countdownText}</span>;
}

export default CountdownTimer;

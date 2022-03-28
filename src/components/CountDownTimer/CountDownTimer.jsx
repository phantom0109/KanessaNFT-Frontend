import Countdown from 'react-countdown';
import { PRESALE_DATE } from '../../config/config';
import { getFormattedText } from '../../utils/helpers';
import './countdown.css';

const CountDownTimer = () => {
    const presaleDate = new Date(PRESALE_DATE);
    
    // Renderer callback with condition
    const renderer = ({days, hours, minutes, seconds, completed }) => {
        // Render a countdown
        return (
            <>
                <div className="time-wrapper">
                    <div className="time-letter-layout">
                        <span className="time-value">{getFormattedText(days)}</span>
                        <span className="time-label">Days</span>
                    </div>
                    <div className="time-divider">:</div>
                    <div className="time-letter-layout">
                        <span className="time-value">{getFormattedText(hours)}</span>
                        <span className="time-label">Hours</span>
                    </div>
                    <div className="time-divider">:</div>
                    <div className="time-letter-layout">
                        <span className="time-value">{getFormattedText(minutes)}</span>
                        <span className="time-label">Minutes</span>
                    </div>
                    <div className="time-divider">:</div>
                    <div className="time-letter-layout">
                        <span className="time-value">{getFormattedText(seconds)}</span>
                        <span className="time-label">Seconds</span>
                    </div>
                </div>
            </>
        )
    };

    return (
        <div className="countdown-wrapper">
            <Countdown date={presaleDate.getTime()} renderer={renderer}/>
        </div>
    );
}
export default CountDownTimer;
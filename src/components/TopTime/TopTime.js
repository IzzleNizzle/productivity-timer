import React from 'react'
import ScheduleIcon from '@material-ui/icons/Schedule';
import './TopTime.scss'
export default function TopTime() {
    return (
        <section class="top-time">
            <div class="top-left-icon">
                <ScheduleIcon />
            </div>
            <div class="main-time-container">
                <p>15:00</p>
                <p>00:15</p>
            </div>
        </section>
    )
}

import React from 'react'
import TimelineIcon from '@material-ui/icons/Timeline';
import PieChartIcon from '@material-ui/icons/PieChart';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import './MiniDash.scss'

export default function MiniDash() {
    return (
        <section class="mini-dashboard">
            <div class="skinny-card">
                <p>Stats</p>
                <TimelineIcon />
            </div>
            <div class="skinny-card">
                <PieChartIcon />
                <p>Stats</p>
            </div>
            <div class="skinny-card">
                <p>Stats</p>
                <TrendingUpIcon />
            </div>
        </section>
    )
}

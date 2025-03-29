import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function ExpenseLineChart({ expenses }) {
    //cheltuielile pe zile
    const dailyExpenses = {};

    expenses.forEach(exp => {
        //daca exp.date este valid, dacă nu, Date.now())
        const dateStr = new Date(exp.date).toLocaleDateString();
        dailyExpenses[dateStr] = (dailyExpenses[dateStr] || 0) + exp.amount;
    });

    //sortează datele cronologic
    const labels = Object.keys(dailyExpenses).sort((a, b) => new Date(a) - new Date(b));
    const dataValues = labels.map(label => dailyExpenses[label]);

    const data = {
        labels,
        datasets: [
            {
                label: 'Daily expenses',
                data: dataValues,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Evolution of daily expenses',
            },
        },
    };

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
}

export default ExpenseLineChart;

<script>
    import NavigationMenu from "../lib/navigation/NavigationMenu.svelte";

    import {Radar} from 'svelte-chartjs';

    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        PointElement,
        RadialLinearScale,
        LineElement,
    } from 'chart.js';

    ChartJS.register(
        Title,
        Tooltip,
        Legend,
        PointElement,
        RadialLinearScale,
        LineElement
    );

    const data = {
        labels: ['MMR', '%', 'Time'],
        datasets: [{
            label: 'August',
            borderColor: 'rgba(255,255,255,1)',
            backgroundColor: 'rgba(250,250,250,0.5)',
            data: [10, 70, 15]
        }]
    };


    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: false }
        },
        scales: {
            r: {
                ticks: {
                    stepSize: 10,
                    backdropColor: 'transparent',
                    max: 100
                },
                pointLabels: {
                    font: { size: 12 }
                },
                angleLines: { display: true },
                grid: { color: 'rgb(255,255,255)' }
            }
        }
    };



</script>

<NavigationMenu>

</NavigationMenu>


<div class="wrapper profile">
    <div class="user-info">

        <div class="profile-image" style="background-image: url('/profile.svg')">

        </div>
        <div class="profile-statistics">

            <div class="info">
                <p class="username">Veeshmare</p>
                <p class="mmr">1337 MMR</p>
            </div>
            <div class="add-friend">
                <input type="friend" placeholder="Add friend" name="" id="">
            </div>
            <div class="chart">

            </div>
        </div>
    </div>
</div>

<style>
    @import "../styles/profile-card.scss";
</style>
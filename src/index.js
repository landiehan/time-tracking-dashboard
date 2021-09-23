import './sass/main.scss';
import './sticky-header';
import '../public/data.json';

const DOM = (function () {
  const currentTimes = document.querySelectorAll('.stat-card__time');
  const previousTimes = document.querySelectorAll('.stat-card__last-time');

  function updateStats(statsData, filter) {
    const timeframes = statsData.map((statData) => statData.timeframes[filter]);

    let previousTimeText;
    switch (filter) {
      case 'daily':
        previousTimeText = 'Yesterday - ';
        break;
      case 'weekly':
        previousTimeText = 'Last Week - ';
        break;
      case 'monthly':
        previousTimeText = 'Last Month - ';
        break;
      default:
        break;
    }

    timeframes.forEach((timeframe, index) => {
      currentTimes[index].textContent = timeframe['current'] + ' hrs';
      previousTimes[index].textContent =
        previousTimeText + timeframe['previous'] + 'hrs';
    });
  }

  return { updateStats };
})();

class Dashboard {
  constructor(filter) {
    this.filter = filter || 'weekly';
  }

  async getStatsData() {
    try {
      const response = await fetch('./data.json');
      const statsData = await response.json();

      await new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('wait 2s');
          resolve();
        }, 1000);
      });

      this.statsData = statsData;
      console.log('Data fetched', this.statsData);
    } catch (err) {}
  }

  updateStats() {
    if (!this.statsData) {
      // TODO: add loading status
      return;
    }

    DOM.updateStats(this.statsData, this.filter);
  }

  init() {
    const filters = document.querySelectorAll('.filter-input');
    filters.forEach((filter) => {
      filter.addEventListener('change', () => {
        const timeframe = filter.dataset.timeframe;

        this.filter = timeframe;
        localStorage.setItem('filter', timeframe);

        this.updateStats();
      });
    });

    document.getElementById(this.filter).setAttribute('checked', '');
    this.getStatsData().then(() => {
      this.updateStats();
    });

    window.addEventListener('beforeunload', () => {
      document.querySelector('form.filters-bar').reset();
    });
  }
}

const dashboard = new Dashboard(localStorage.getItem('filter'));
dashboard.init();

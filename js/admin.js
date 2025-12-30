// Admin Dashboard Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    
    // Initialize sidebar state based on screen size
    function initializeSidebar() {
        if (window.innerWidth >= 1024) {
            // Desktop: sidebar visible by default
            sidebar.classList.remove('sidebar-hidden');
            sidebar.classList.add('sidebar-visible');
            mainContent.classList.remove('sidebar-closed');
        } else {
            // Mobile: sidebar hidden by default
            sidebar.classList.remove('sidebar-visible');
            sidebar.classList.add('sidebar-hidden');
        }
    }
    
    // Initialize on load
    initializeSidebar();
    
    // Re-initialize on resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initializeSidebar, 250);
    });
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle sidebar visibility class
            const isVisible = sidebar.classList.contains('sidebar-visible');
            
            if (isVisible) {
                // Hide sidebar
                sidebar.classList.remove('sidebar-visible');
                sidebar.classList.add('sidebar-hidden');
                document.body.classList.remove('sidebar-open');
                if (window.innerWidth >= 1024) {
                    mainContent.classList.add('sidebar-closed');
                }
            } else {
                // Show sidebar
                sidebar.classList.remove('sidebar-hidden');
                sidebar.classList.add('sidebar-visible');
                if (window.innerWidth < 1024) {
                    document.body.classList.add('sidebar-open');
                }
                if (window.innerWidth >= 1024) {
                    mainContent.classList.remove('sidebar-closed');
                }
            }
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 1024 && sidebar && sidebar.classList.contains('sidebar-visible')) {
            // Check if click is outside sidebar and not on toggle button
            if (!sidebar.contains(e.target) && e.target !== sidebarToggle && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('sidebar-visible');
                sidebar.classList.add('sidebar-hidden');
                document.body.classList.remove('sidebar-open');
            }
        }
    });

    // Navigation Items
    const navItems = document.querySelectorAll('.admin-nav-item');
    const sections = document.querySelectorAll('.admin-section');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's an external link (starts with http or is a .html file), allow normal navigation
            if (href && (href.startsWith('http') || href.endsWith('.html') || href.includes('index.html'))) {
                // Allow normal link behavior - don't prevent default
                return true;
            }
            
            // Otherwise, handle internal section navigation
            e.preventDefault();
            const targetId = href.substring(1);
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('bg-blue-600'));
            navItems.forEach(nav => nav.classList.add('hover:bg-gray-800'));
            this.classList.add('bg-blue-600');
            this.classList.remove('hover:bg-gray-800');
            
            // Show target section
            sections.forEach(section => section.classList.add('hidden'));
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
            }
        });
    });

    // Initialize Charts
    if (typeof Chart !== 'undefined') {
        // Revenue Chart - Clear Increasing Trend
        const revenueCtx = document.getElementById('revenueChart');
        if (revenueCtx) {
            const revenueData = [15000, 18000, 22000, 25000, 28000, 32000, 35000, 38000, 42000, 45000, 48000, 52000];
            
            new Chart(revenueCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Revenue ($) - Increasing Trend ↗',
                        data: revenueData,
                        borderColor: 'rgb(34, 197, 94)',
                        backgroundColor: 'rgba(34, 197, 94, 0.15)',
                        borderWidth: 4,
                        fill: true,
                        tension: 0.5,
                        pointRadius: 6,
                        pointHoverRadius: 9,
                        pointBackgroundColor: 'rgb(34, 197, 94)',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 3,
                        pointHoverBackgroundColor: 'rgb(34, 197, 94)',
                        pointHoverBorderColor: '#fff',
                        pointHoverBorderWidth: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                usePointStyle: true,
                                padding: 20,
                                font: {
                                    size: 13,
                                    weight: 'bold',
                                    family: "'Inter', sans-serif"
                                },
                                color: 'rgb(34, 197, 94)'
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.85)',
                            padding: 15,
                            titleFont: {
                                size: 15,
                                weight: 'bold'
                            },
                            bodyFont: {
                                size: 14,
                                weight: '500'
                            },
                            displayColors: true,
                            borderColor: 'rgb(34, 197, 94)',
                            borderWidth: 2,
                            callbacks: {
                                label: function(context) {
                                    const value = context.parsed.y;
                                    const index = context.dataIndex;
                                    let growth = '';
                                    if (index > 0) {
                                        const prevValue = revenueData[index - 1];
                                        const growthPercent = ((value - prevValue) / prevValue * 100).toFixed(1);
                                        growth = ` (+${growthPercent}% from previous month)`;
                                    }
                                    return 'Revenue: $' + value.toLocaleString() + growth;
                                },
                                footer: function(tooltipItems) {
                                    const firstValue = revenueData[0];
                                    const lastValue = revenueData[revenueData.length - 1];
                                    const totalGrowth = ((lastValue - firstValue) / firstValue * 100).toFixed(1);
                                    return 'Total Growth: +' + totalGrowth + '% (Jan to Dec)';
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: 10000,
                            max: 55000,
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                },
                                font: {
                                    size: 12,
                                    weight: '500'
                                },
                                color: '#666'
                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0.08)',
                                lineWidth: 1
                            },
                            title: {
                                display: true,
                                text: 'Revenue in USD',
                                font: {
                                    size: 13,
                                    weight: 'bold'
                                },
                                color: '#333'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                font: {
                                    size: 12,
                                    weight: '500'
                                },
                                color: '#666'
                            }
                        }
                    },
                    animation: {
                        duration: 2500,
                        easing: 'easeInOutQuart',
                        onComplete: function() {
                            // Add visual indicator that trend is increasing
                            const chart = this.chart;
                            const ctx = chart.ctx;
                            const dataset = chart.data.datasets[0];
                            const meta = chart.getDatasetMeta(0);
                            
                            // Draw upward trend arrow on the last point
                            if (meta.data.length > 0) {
                                const lastPoint = meta.data[meta.data.length - 1];
                                ctx.save();
                                ctx.fillStyle = 'rgb(34, 197, 94)';
                                ctx.font = 'bold 16px Arial';
                                ctx.fillText('↗', lastPoint.x + 15, lastPoint.y - 10);
                                ctx.restore();
                            }
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    }
                }
            });
        }

        // Category Chart
        const categoryCtx = document.getElementById('categoryChart');
        if (categoryCtx) {
            new Chart(categoryCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Beach', 'Mountain', 'City', 'Adventure', 'Luxury'],
                    datasets: [{
                        label: 'Bookings',
                        data: [320, 245, 180, 150, 95],
                        backgroundColor: [
                            'rgb(59, 130, 246)',
                            'rgb(34, 197, 94)',
                            'rgb(168, 85, 247)',
                            'rgb(249, 115, 22)',
                            'rgb(234, 179, 8)'
                        ],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 15,
                                usePointStyle: true,
                                font: {
                                    size: 12,
                                    weight: '500'
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.85)',
                            padding: 12,
                            titleFont: {
                                size: 14,
                                weight: 'bold'
                            },
                            bodyFont: {
                                size: 13
                            },
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.parsed || 0;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = ((value / total) * 100).toFixed(1);
                                    return label + ': ' + value + ' bookings (' + percentage + '%)';
                                }
                            }
                        }
                    },
                    animation: {
                        animateRotate: true,
                        animateScale: true,
                        duration: 2000
                    }
                }
            });
        }
    }
});


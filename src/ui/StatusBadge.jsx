function StatusBadge({ status }) {
    const badgeColors = {
        'booked': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        'checkin': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        'checkout': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        'cancelled': 'bg-red-100 text-gray-800 dark:bg-red-700 dark:text-gray-300',
    };

    const badgeText = {
        'booked': 'Booked',
        'checkin': 'Checked In',
        'checkout': 'Checked Out',
        'cancelled': 'Cancelled',
    };

    const badgeColor = badgeColors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    const text = badgeText[status] || status;

    return (
        <span
            className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:text-gray-300 ${badgeColor}`}
        >
            {text}
        </span>
    );
}

export default StatusBadge;
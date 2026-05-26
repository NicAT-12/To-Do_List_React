const StatsCard = ({ title, value }) => {
    return (
        <article className="stats-card">
            <p className="stats-card__title">{title}</p>
            <strong className="stats-card__value">{value}</strong>
        </article>
    );
};

export default StatsCard;
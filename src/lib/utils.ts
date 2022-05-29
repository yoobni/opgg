

export function KDACalculator(kills: number = 0, deaths: number = 0, assists: number = 0, games: number = 0) {
    const kda = deaths === 0 ? 0 : ((kills + assists) / deaths).toFixed(2);
    const averageKillRate = (kills / games).toFixed(1);
    const averageDeathRate = (deaths / games).toFixed(1);
    const averageAssistRate = (assists / games).toFixed(1);

    return {
        kda,
        averageKillRate,
        averageDeathRate,
        averageAssistRate,
    }
}
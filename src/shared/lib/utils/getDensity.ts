export function getWaterDensity(temperature: number, pressure: number = 15) {
    // pressure в МПа
    // Расчет плотности при атмосферном давлении
    const t = temperature - 273.15; // перевод в градусы Цельсия
    const a1 = -3.983035;
    const a2 = 301.797;
    const a3 = 522528.9;
    const a4 = 69.34881;
    const a5 = 999.97495;

    // Базовая плотность при заданной температуре и атмосферном давлении
    const rho_0 = a5 * (1 - ((t + a1) * (t + a1) * (t + a2)) / (a3 * (t + a4)));

    // Коэффициенты для расчета сжимаемости воды
    const k0 = 50.74e-11; // изотермическая сжимаемость при 20°C, Па^-1
    const beta = 0.0002; // температурная зависимость сжимаемости, °C^-1

    // Корректировка коэффициента сжимаемости с учетом температуры
    const k = k0 * (1 + beta * (t - 20));

    // Расчет плотности с учетом давления
    const deltaP = (pressure - 0.101325) * 1e6; // перевод разницы давлений в Па
    const rho = rho_0 * (1 + k * deltaP);

    return rho / 1000;
}

export function getUO2Density(temperature: number) {
    // Начальная плотность UO2 при комнатной температуре (298 K) = 10.97 г/см³
    const rho0 = 10.97;

    // Температурный коэффициент линейного расширения для UO2
    const alpha = 10.8e-6; // 1/K

    // Расчет плотности по формуле:
    // ρ(T) = ρ0 / (1 + β∆T)³
    // где β = α - коэффициент линейного расширения
    // ∆T = T - T0, где T0 = 298K (комнатная температура)

    const deltaT = temperature - 298;
    const denominator = Math.pow(1 + alpha * deltaT, 3);

    return rho0 / denominator;
}

export function getZrDensity(temperature: number) {
    const phaseTransitionTemp = 1135; // K
    const rho0 = 6.52; // г/см³ (преобразовано из 6520 кг/м³)

    if (temperature < phaseTransitionTemp) {
        // α-Zr
        const alpha = 5.85e-6;
        const deltaT = temperature - 298;
        return rho0 / Math.pow(1 + alpha * deltaT, 3);
    } else {
        // β-Zr
        const alpha = 9.7e-6;
        const deltaT = temperature - 298;
        // Учитываем скачок плотности при фазовом переходе (примерно 0.6%)
        return (rho0 * 0.994) / Math.pow(1 + alpha * deltaT, 3);
    }
}

export function getO2Density(temperature: number, pressure: number = 101325) {
    // Молярная масса O2 (кг/моль)
    const M = 0.032;

    // Универсальная газовая постоянная (Дж/(моль·К))
    const R = 8.31446;

    // Параметры уравнения состояния реального газа для O2
    // Константы уравнения Ван-дер-Ваальса
    const a = 0.138; // (Па·м⁶/моль²)
    const b = 3.183e-5; // (м³/моль)

    // Используем уравнение Ван-дер-Ваальса для более точного расчета
    // (P + an²/V²)(V - nb) = nRT
    // где n/V = ρ/M - молярная концентрация

    // Решаем кубическое уравнение итеративным методом
    let density = (pressure * M) / (R * temperature); // Начальное приближение (идеальный газ)

    for (let i = 0; i < 10; i++) {
        // 10 итераций обычно достаточно для сходимости
        const rho = density;
        density =
            (pressure * M) /
            (R * temperature - b * pressure + (a * rho * rho) / M);
    }

    return Math.max(0, density); // Защита от отрицательных значений
}

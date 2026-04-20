
export const typeDescriptions = {
    'OPTI CUT M42': 'Uniwersalna piła bimetalowa M42. Optymalna do cięcia stali konstrukcyjnych, profili i prętów. Dobry stosunek ceny do wydajności.',
    'BEST CUT M51': 'Wysokowydajna piła bimetalowa M51. Do stali trudnoobrabialnych, stopowych i nierdzewnych. Zwiększona trwałość i odporność na ciepło.',
    'PROFIL CUT M42': 'Piła bimetalowa M42 do cięcia profili i rur cienkościennych. Zmienny podziałka zębów zapewnia czyste cięcie bez drgań.',
};

export const typeColors = {
    'OPTI CUT M42': { bg: '#FFF3E0', border: '#FB8C00', text: '#E65100' },
    'BEST CUT M51': { bg: '#FFEBEE', border: '#E53935', text: '#B71C1C' },
    'PROFIL CUT M42': { bg: '#E8F5E9', border: '#43A047', text: '#1B5E20' },
};

export const tpiData = {
    '2/3': { range: '140-250 mm'},
    '3/4': { range: '80-140 mm'},
    '4/6': { range: '50-80 mm'},
    '5/8': { range: '30-50 mm'},
    '6/10': { range: '20-30 mm'},
    '8/12': { range: '10-20 mm'},
    '10/14': { range: '5-10 mm'},
    '14/18': { range: '< 5 mm'},
};

export const getTpiHint = (tpiValue, isMobile = false) => {
    const data = tpiData[tpiValue];
    if (!data) return '';

    if(isMobile) return `Optymalny przekrój ${data.range}`;
    
    if (tpiValue === '14/18') {
        return `Zalecana do bardzo cienkich ścianek i blach ${data.range}`;
    }

    return `Optymalny przekrój materiału pełnego: ${data.range}`;
};
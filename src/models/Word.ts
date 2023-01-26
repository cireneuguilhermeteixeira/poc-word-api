export interface Word {
    word: string;
    results?: Array<Result>,
    syllables?: Syllables,
    pronunciation: {
        all: string
    },
    frequency: number
}


export interface Result {
    definition: string,
    partOfSpeech: string,
    synonyms?: Array<string>,
    typeOf: Array<string>,
    memberOf: Array<string>,
    hasParts: Array<string>
}

export interface Syllables {
    count: number,
    list: Array<string>
}
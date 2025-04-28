import {Epigram} from "../types/Epigram.ts";

const url = "http://localhost:8080/api/epigrams";

export async function createEpigram(epigram: Epigram) {
    const response = await fetch(`${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(epigram),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || response.statusText);
    }

    return data as Epigram;
}

export async function getAllEpigrams() {
    const response = await fetch(`${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || response.statusText);
    }

    return data as Epigram[];
}

// export async function getEpigramById(epigram: string) {}
//
// export async function updateEpigram(epigram: string) {}
//
// export async function deleteEpigram(epigram: string) {}

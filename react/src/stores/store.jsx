// Создание контекста с MobX, где будет храниться состояние слов

import { makeAutoObservable } from "mobx";

class WordStore {
    words = [];

    constructor() {
        makeAutoObservable(this);
    }

    setWords(data) {
        this.words = data;
    }

    addWord(word) {
        this.words.push(word);
    }

    updateWord(id, updatedWord) {
        const index = this.words.findIndex(word => word.id === id);
        if (index !== -1) {
            this.words[index] = { ...this.words[index], ...updatedWord };
        }
    }

    deleteWord(id) {
        this.words = this.words.filter(word => word.id !== id);
    }

    async fetchWords() {
        try {
            const response = await fetch('http://itgirlschool.justmakeit.ru/api/words');
            const data = await response.json();
            this.setWords(data);
        } catch (error) {
            console.error("Ошибка при получении данных", error);
        }
    }

    async saveWord(word) {
        try {
            const response = await fetch('http://itgirlschool.justmakeit.ru/api/words', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(word),
            });
            const data = await response.json();
            this.addWord(data);
        } catch (error) {
            console.error("Ошибка при добавлении слова", error);
        }
    }

    async updateWordOnServer(id, updatedWord) {
        try {
            const response = await fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedWord),
            });
            const data = await response.json();
            this.updateWord(id, data);
        } catch (error) {
            console.error("Ошибка при обновлении слова", error);
        }
    }

    async deleteWordOnServer(id) {
        try {
            await fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}`, {
                method: 'DELETE',
            });
            this.deleteWord(id);
        } catch (error) {
            console.error("Ошибка при удалении слова", error);
        }
    }
}

const wordStore = new WordStore();
export default wordStore;
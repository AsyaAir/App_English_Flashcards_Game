// Создание context для управления коллекцией слов, 
// чтобы данные были доступны в любом месте приложения.

// Разделила WordsContext и WordsProvider на два файла. 
// WordsContext теперь отдельный, не мешает Fast Refresh

import { createContext } from 'react';

export const WordsContext = createContext({});
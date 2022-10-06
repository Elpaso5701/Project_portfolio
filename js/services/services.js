 //postData- функция с параметрами постинга данных
 const postData = async (url, data) => {//url - url который передается в fetch, data-данные которые постит ф-ия 
    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
    return await res.json();//Промис, результат работы ф-ии 
};

const getResource = async (url) => {
    const res = await fetch(url);//делаем запрос, дожидаемся его окончания(await)

    if (!res.ok) {
        throw new Error();//выкидываем новую ошибку
    }
    return await res.json();//трансформируем данные в Json
};

export {postData};
export {getResource};
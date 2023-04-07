//создаем функцию  фильтрации типа данных(передаем два параметра значение инпута "тип" и значение инпута "данные" )
const filterByType = ((type, ...values) => {
	//из функции возвращаем новые массивы через метод filter()(проверка на равенство знчений инпутов "тип" и "данные")
	return values.filter(value => typeof value === type)
}),

	//создаем функцию,чтобы скрыть все диалоговые блоки
	hideAllResponseBlocks = () => {
		//(получаю массив дилоговых блоков)(создаю новый экз-р массива) (заношу в переменную)
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		console.log(responseBlocksArray);
		//перебираем диалоговые блоки ответов
		responseBlocksArray.forEach(block => {
			//скрываем блок	
			block.style.display = 'none'
		});
	},
	// создем функцию для показа диалогового окна(передаем 3 параметра: класс блока,текстовое сообщение,span)
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		//вызов функции hideAllResponseBlocks()		
		hideAllResponseBlocks();
		//блоку передаем стиль "block" - показываем	блок	
		document.querySelector(blockSelector).style.display = 'block';
		//проверка на наличие spana(если есть span) 
		if (spanSelector) {
			//то спану задаем текстовое сообщение
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
	//создаем функцию(показ ошибки в случае ошибки),передаем параметром текстовое сообщение)внутри функции вызваем showResponseBlock() с тремя аргументами
	showError = (msgText) => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	//создаем функцию(показ результат в случае успешной работы),передаем параметром текстовое сообщение)внутри функции вызваем showResponseBlock() с тремя аргументами
	showResults = (msgText) => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	//создаем функцию(без результата) внутри функции вызваем showResponseBlock() с одним аргументом 
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),


	// создаем функцию фильтрации по типу,передаем в нее два параметра(значение инпута "тип" и значение инпута "данные" )
	tryFilterByType = (type, values) => {
		//используем конструкцию try/catch 
		try {
			//в переменную записываем выполнение метода eval(позволяет выполнять код если строка)в шаблоннй строке метода,вызываем filterByType(с двумя аргументами) соединяя элементы  массива в строку
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			//в перменную записываем выполнение тернарного оператора(если не пустая строка)
			const alertMsg = (valuesArray.length) ?
			//создаем строку в случае true
				`Данные с типом ${type}: ${valuesArray}` :
				// иначе создаем строку в случае false
				`Отсутствуют данные типа ${type}`;
			//вызваем функцию  showResults(передаем аргументом текстовое сообщение)			
			showResults(alertMsg);
		} catch (e) {
			//вызваем функцию  showError(передаем аргументом текстовое сообщение ошибки)			
			showError(`Ошибка: ${e}`);
		}
	};

// получение кнопки "фильтровать"
const filterButton = document.querySelector('#filter-btn');
//навешиваю на кнопку "фильтровать" обработчик события
filterButton.addEventListener('click', e => {
	//получаю поле инпут "тип"
	const typeInput = document.querySelector('#type');
	//получаю поле инпут "данные"
	const dataInput = document.querySelector('#data');
	// проверка на пустую строку(если поле инпут "данные" пустое)
	if (dataInput.value === '') {
		//устанавливаем специальное сообщение элемента инпут "данные"
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		//вызов функции showNoResults()			
		showNoResults();
	} else {
		//иначе устанавливаем специальное сообщение элемента инпут "данные"
		dataInput.setCustomValidity('');
		//отменяем действие браузера по умолчанию,чтобы не было перезагрузки страницы
		e.preventDefault();
		// вызов функции tryFilterByType(передаем аргументы значение инпута "тип", значение инпута "данные")удаляя пробелы методом trim()
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});


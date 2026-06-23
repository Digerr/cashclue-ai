// BrainBolt quiz data — 16 quizzes × 10 questions × 2 languages (EN + RU)

export type Lang = 'en' | 'ru' | 'es' | 'de' | 'fr';

export interface LocalizedText {
  en: string;
  ru: string;
}

export interface SeedQuestion {
  text: LocalizedText;
  options: LocalizedText[];
  correctIndex: number;
  explanation?: LocalizedText;
  timeLimit?: number;
}

export interface SeedQuiz {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  category: LocalizedText;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
  color: string;
  isPremium?: boolean;
  questions: SeedQuestion[];
}

export const SEED_QUIZZES: SeedQuiz[] = [
  // ============================================================
  // 1. SCIENCE
  // ============================================================
  {
    slug: 'science-basics',
    title: { en: 'Science Fundamentals', ru: 'Основы науки' },
    description: { en: 'Test your knowledge of basic physics, chemistry, and biology.', ru: 'Проверь знания по физике, химии и биологии.' },
    category: { en: 'Science', ru: 'Наука' },
    difficulty: 'easy',
    icon: '🔬',
    color: '#34d399',
    questions: [
      {
        text: { en: 'What is the chemical symbol for gold?', ru: 'Какой химический символ у золота?' },
        options: [
          { en: 'Au', ru: 'Au' },
          { en: 'Ag', ru: 'Ag' },
          { en: 'Gd', ru: 'Gd' },
          { en: 'Go', ru: 'Go' },
        ],
        correctIndex: 0,
        explanation: { en: 'Au comes from Latin "aurum" meaning gold.', ru: 'Au от латинского "aurum" — золото.' },
      },
      {
        text: { en: 'How many planets are in our solar system?', ru: 'Сколько планет в Солнечной системе?' },
        options: [
          { en: '7', ru: '7' },
          { en: '8', ru: '8' },
          { en: '9', ru: '9' },
          { en: '10', ru: '10' },
        ],
        correctIndex: 1,
        explanation: { en: 'Pluto was reclassified as a dwarf planet in 2006.', ru: 'Плутон переклассифицировали в карликовую планету в 2006.' },
      },
      {
        text: { en: 'What gas do plants absorb from the atmosphere?', ru: 'Какой газ растения поглощают из атмосферы?' },
        options: [
          { en: 'Oxygen', ru: 'Кислород' },
          { en: 'Nitrogen', ru: 'Азот' },
          { en: 'Carbon Dioxide', ru: 'Углекислый газ' },
          { en: 'Hydrogen', ru: 'Водород' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'What is the speed of light in vacuum (approx)?', ru: 'Скорость света в вакууме (приблизительно)?' },
        options: [
          { en: '300,000 km/s', ru: '300 000 км/с' },
          { en: '150,000 km/s', ru: '150 000 км/с' },
          { en: '1,000,000 km/s', ru: '1 000 000 км/с' },
          { en: '30,000 km/s', ru: '30 000 км/с' },
        ],
        correctIndex: 0,
      },
      {
        text: { en: 'Which element has the atomic number 1?', ru: 'Какой элемент имеет атомный номер 1?' },
        options: [
          { en: 'Helium', ru: 'Гелий' },
          { en: 'Hydrogen', ru: 'Водород' },
          { en: 'Carbon', ru: 'Углерод' },
          { en: 'Oxygen', ru: 'Кислород' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What is the powerhouse of the cell?', ru: 'Что является энергетической станцией клетки?' },
        options: [
          { en: 'Nucleus', ru: 'Ядро' },
          { en: 'Ribosome', ru: 'Рибосома' },
          { en: 'Mitochondria', ru: 'Митохондрии' },
          { en: 'Golgi apparatus', ru: 'Аппарат Гольджи' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: "What is the most abundant gas in Earth's atmosphere?", ru: 'Самый распространённый газ в атмосфере Земли?' },
        options: [
          { en: 'Oxygen', ru: 'Кислород' },
          { en: 'Carbon Dioxide', ru: 'Углекислый газ' },
          { en: 'Nitrogen', ru: 'Азот' },
          { en: 'Argon', ru: 'Аргон' },
        ],
        correctIndex: 2,
        explanation: { en: 'Nitrogen makes up ~78% of the atmosphere.', ru: 'Азот составляет ~78% атмосферы.' },
      },
      {
        text: { en: 'How many bones are in the adult human body?', ru: 'Сколько костей в теле взрослого человека?' },
        options: [
          { en: '186', ru: '186' },
          { en: '206', ru: '206' },
          { en: '226', ru: '226' },
          { en: '246', ru: '246' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What is H2O commonly known as?', ru: 'Как обычно называют H2O?' },
        options: [
          { en: 'Salt', ru: 'Соль' },
          { en: 'Water', ru: 'Вода' },
          { en: 'Hydrogen peroxide', ru: 'Перекись водорода' },
          { en: 'Acid', ru: 'Кислота' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Which scientist proposed the theory of relativity?', ru: 'Какой учёный предложил теорию относительности?' },
        options: [
          { en: 'Isaac Newton', ru: 'Исаак Ньютон' },
          { en: 'Albert Einstein', ru: 'Альберт Эйнштейн' },
          { en: 'Stephen Hawking', ru: 'Стивен Хокинг' },
          { en: 'Galileo Galilei', ru: 'Галилео Галилей' },
        ],
        correctIndex: 1,
      },
    ],
  },

  // ============================================================
  // 2. HISTORY
  // ============================================================
  {
    slug: 'world-history',
    title: { en: 'World History', ru: 'Мировая история' },
    description: { en: 'From ancient civilizations to modern events.', ru: 'От древних цивилизаций до современных событий.' },
    category: { en: 'History', ru: 'История' },
    difficulty: 'medium',
    icon: '🏛️',
    color: '#fbbf24',
    questions: [
      {
        text: { en: 'In which year did World War II end?', ru: 'В каком году закончилась Вторая мировая война?' },
        options: [
          { en: '1943', ru: '1943' },
          { en: '1944', ru: '1944' },
          { en: '1945', ru: '1945' },
          { en: '1946', ru: '1946' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'Who was the first President of the United States?', ru: 'Кто был первым президентом США?' },
        options: [
          { en: 'Thomas Jefferson', ru: 'Томас Джефферсон' },
          { en: 'George Washington', ru: 'Джордж Вашингтон' },
          { en: 'John Adams', ru: 'Джон Адамс' },
          { en: 'Benjamin Franklin', ru: 'Бенджамин Франклин' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'The Great Wall of China was primarily built to defend against which group?', ru: 'Великая Китайская стена строилась для защиты от кого?' },
        options: [
          { en: 'Mongols', ru: 'Монголы' },
          { en: 'Japanese', ru: 'Японцы' },
          { en: 'Russians', ru: 'Русские' },
          { en: 'Koreans', ru: 'Корейцы' },
        ],
        correctIndex: 0,
      },
      {
        text: { en: 'Which ancient civilization built the pyramids of Giza?', ru: 'Какая древняя цивилизация построила пирамиды Гизы?' },
        options: [
          { en: 'Romans', ru: 'Римляне' },
          { en: 'Greeks', ru: 'Греки' },
          { en: 'Egyptians', ru: 'Египтяне' },
          { en: 'Persians', ru: 'Персы' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'In which year did the Berlin Wall fall?', ru: 'В каком году пала Берлинская стена?' },
        options: [
          { en: '1987', ru: '1987' },
          { en: '1989', ru: '1989' },
          { en: '1991', ru: '1991' },
          { en: '1993', ru: '1993' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Who painted the Mona Lisa?', ru: 'Кто написал Мону Лизу?' },
        options: [
          { en: 'Michelangelo', ru: 'Микеланджело' },
          { en: 'Raphael', ru: 'Рафаэль' },
          { en: 'Leonardo da Vinci', ru: 'Леонардо да Винчи' },
          { en: 'Donatello', ru: 'Донателло' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'The French Revolution began in which year?', ru: 'Французская революция началась в каком году?' },
        options: [
          { en: '1776', ru: '1776' },
          { en: '1789', ru: '1789' },
          { en: '1799', ru: '1799' },
          { en: '1812', ru: '1812' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Which empire was ruled by Julius Caesar?', ru: 'Какой империей правил Юлий Цезарь?' },
        options: [
          { en: 'Greek', ru: 'Греческой' },
          { en: 'Roman', ru: 'Римской' },
          { en: 'Persian', ru: 'Персидской' },
          { en: 'Ottoman', ru: 'Османской' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Who was the first emperor of China?', ru: 'Кто был первым императором Китая?' },
        options: [
          { en: 'Confucius', ru: 'Конфуций' },
          { en: 'Lao Tzu', ru: 'Лао-цзы' },
          { en: 'Qin Shi Huang', ru: 'Цинь Шихуанди' },
          { en: 'Sun Tzu', ru: 'Сунь-цзы' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'The Renaissance began in which country?', ru: 'В какой стране начался Ренессанс?' },
        options: [
          { en: 'France', ru: 'Франция' },
          { en: 'Spain', ru: 'Испания' },
          { en: 'Italy', ru: 'Италия' },
          { en: 'Germany', ru: 'Германия' },
        ],
        correctIndex: 2,
      },
    ],
  },

  // ============================================================
  // 3. GEOGRAPHY
  // ============================================================
  {
    slug: 'world-geography',
    title: { en: 'World Geography', ru: 'География мира' },
    description: { en: 'Capitals, rivers, mountains, and more.', ru: 'Столицы, реки, горы и многое другое.' },
    category: { en: 'Geography', ru: 'География' },
    difficulty: 'easy',
    icon: '🌍',
    color: '#60a5fa',
    questions: [
      {
        text: { en: 'What is the capital of Australia?', ru: 'Столица Австралии?' },
        options: [
          { en: 'Sydney', ru: 'Сидней' },
          { en: 'Melbourne', ru: 'Мельбурн' },
          { en: 'Canberra', ru: 'Канберра' },
          { en: 'Perth', ru: 'Перт' },
        ],
        correctIndex: 2,
        explanation: { en: 'Canberra was specifically built as the capital.', ru: 'Канберра была специально построена как столица.' },
      },
      {
        text: { en: 'Which is the longest river in the world?', ru: 'Самая длинная река в мире?' },
        options: [
          { en: 'Amazon', ru: 'Амазонка' },
          { en: 'Nile', ru: 'Нил' },
          { en: 'Yangtze', ru: 'Янцзы' },
          { en: 'Mississippi', ru: 'Миссисипи' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Mount Everest is located in which mountain range?', ru: 'Эверест находится в какой горной системе?' },
        options: [
          { en: 'Andes', ru: 'Анды' },
          { en: 'Alps', ru: 'Альпы' },
          { en: 'Himalayas', ru: 'Гималаи' },
          { en: 'Rockies', ru: 'Скалистые горы' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'What is the largest country by area?', ru: 'Самая большая страна по площади?' },
        options: [
          { en: 'China', ru: 'Китай' },
          { en: 'USA', ru: 'США' },
          { en: 'Canada', ru: 'Канада' },
          { en: 'Russia', ru: 'Россия' },
        ],
        correctIndex: 3,
      },
      {
        text: { en: 'Which ocean is the largest?', ru: 'Какой океан самый большой?' },
        options: [
          { en: 'Atlantic', ru: 'Атлантический' },
          { en: 'Indian', ru: 'Индийский' },
          { en: 'Arctic', ru: 'Северный Ледовитый' },
          { en: 'Pacific', ru: 'Тихий' },
        ],
        correctIndex: 3,
      },
      {
        text: { en: 'What is the capital of Brazil?', ru: 'Столица Бразилии?' },
        options: [
          { en: 'Rio de Janeiro', ru: 'Рио-де-Жанейро' },
          { en: 'São Paulo', ru: 'Сан-Паулу' },
          { en: 'Brasília', ru: 'Бразилиа' },
          { en: 'Salvador', ru: 'Салвадор' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'The Sahara Desert is located on which continent?', ru: 'Сахара находится на каком континенте?' },
        options: [
          { en: 'Asia', ru: 'Азия' },
          { en: 'Africa', ru: 'Африка' },
          { en: 'Australia', ru: 'Австралия' },
          { en: 'South America', ru: 'Южная Америка' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Which country has the most natural lakes?', ru: 'В какой стране больше всего природных озёр?' },
        options: [
          { en: 'USA', ru: 'США' },
          { en: 'Russia', ru: 'Россия' },
          { en: 'Canada', ru: 'Канада' },
          { en: 'Finland', ru: 'Финляндия' },
        ],
        correctIndex: 2,
        explanation: { en: 'Canada has over 2 million lakes.', ru: 'В Канаде более 2 миллионов озёр.' },
      },
      {
        text: { en: 'What is the smallest country in the world?', ru: 'Самая маленькая страна в мире?' },
        options: [
          { en: 'Monaco', ru: 'Монако' },
          { en: 'Vatican City', ru: 'Ватикан' },
          { en: 'San Marino', ru: 'Сан-Марино' },
          { en: 'Liechtenstein', ru: 'Лихтенштейн' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Which African country was formerly known as Abyssinia?', ru: 'Какая африканская страна раньше называлась Абиссинией?' },
        options: [
          { en: 'Egypt', ru: 'Египет' },
          { en: 'Ethiopia', ru: 'Эфиопия' },
          { en: 'Somalia', ru: 'Сомали' },
          { en: 'Sudan', ru: 'Судан' },
        ],
        correctIndex: 1,
      },
    ],
  },

  // ============================================================
  // 4. MOVIES
  // ============================================================
  {
    slug: 'movie-trivia',
    title: { en: 'Movie Trivia', ru: 'Кино' },
    description: { en: 'Test your knowledge of cinema classics and blockbusters.', ru: 'Проверь знания о классике и блокбастерах.' },
    category: { en: 'Movies', ru: 'Кино' },
    difficulty: 'medium',
    icon: '🎬',
    color: '#f472b6',
    questions: [
      {
        text: { en: 'Who directed the movie "Inception"?', ru: 'Кто режиссёр фильма "Начало"?' },
        options: [
          { en: 'Steven Spielberg', ru: 'Стивен Спилберг' },
          { en: 'Christopher Nolan', ru: 'Кристофер Нолан' },
          { en: 'Quentin Tarantino', ru: 'Квентин Тарантино' },
          { en: 'Martin Scorsese', ru: 'Мартин Скорсезе' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'In "The Matrix", what color pill does Neo take?', ru: 'В "Матрице" какую таблетку берёт Нео?' },
        options: [
          { en: 'Blue', ru: 'Синюю' },
          { en: 'Red', ru: 'Красную' },
          { en: 'Green', ru: 'Зелёную' },
          { en: 'Yellow', ru: 'Жёлтую' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Which movie won the Best Picture Oscar in 2020?', ru: 'Какой фильм получил "Оскар" за лучший фильм в 2020?' },
        options: [
          { en: '1917', ru: '1917' },
          { en: 'Joker', ru: 'Джокер' },
          { en: 'Parasite', ru: 'Паразиты' },
          { en: 'Once Upon a Time in Hollywood', ru: 'Однажды в… Голливуде' },
        ],
        correctIndex: 2,
        explanation: { en: 'First non-English language film to win.', ru: 'Первый неанглоязычный фильм, получивший награду.' },
      },
      {
        text: { en: 'Who played Jack in "Titanic" (1997)?', ru: 'Кто сыграл Джека в "Титанике" (1997)?' },
        options: [
          { en: 'Brad Pitt', ru: 'Брэд Питт' },
          { en: 'Matt Damon', ru: 'Мэтт Деймон' },
          { en: 'Leonardo DiCaprio', ru: 'Леонардо ДиКаприо' },
          { en: 'Tom Cruise', ru: 'Том Круз' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'In which year was the first "Star Wars" released?', ru: 'В каком году вышел первый "Звёздные войны"?' },
        options: [
          { en: '1975', ru: '1975' },
          { en: '1977', ru: '1977' },
          { en: '1979', ru: '1979' },
          { en: '1981', ru: '1981' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Who directed "Pulp Fiction"?', ru: 'Кто режиссёр "Криминального чтива"?' },
        options: [
          { en: 'Quentin Tarantino', ru: 'Квентин Тарантино' },
          { en: 'Robert Rodriguez', ru: 'Роберт Родригес' },
          { en: 'David Lynch', ru: 'Дэвид Линч' },
          { en: 'Coen Brothers', ru: 'Братья Коэн' },
        ],
        correctIndex: 0,
      },
      {
        text: { en: 'Which Pixar movie features a rat who loves cooking?', ru: 'В каком фильме Pixar крыса любит готовить?' },
        options: [
          { en: 'Ratatouille', ru: 'Рататуй' },
          { en: 'Coco', ru: 'Тайна Коко' },
          { en: 'Up', ru: 'Вверх' },
          { en: 'Wall-E', ru: 'ВАЛЛ-И' },
        ],
        correctIndex: 0,
      },
      {
        text: { en: 'Who played the Joker in "The Dark Knight"?', ru: 'Кто сыграл Джокера в "Тёмном рыцаре"?' },
        options: [
          { en: 'Jared Leto', ru: 'Джаред Лето' },
          { en: 'Joaquin Phoenix', ru: 'Хоакин Феникс' },
          { en: 'Heath Ledger', ru: 'Хит Леджер' },
          { en: 'Jack Nicholson', ru: 'Джек Николсон' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'The Lord of the Rings trilogy was filmed primarily in which country?', ru: 'Трилогия "Властелин колец" снималась в основном в какой стране?' },
        options: [
          { en: 'Australia', ru: 'Австралия' },
          { en: 'Canada', ru: 'Канада' },
          { en: 'New Zealand', ru: 'Новая Зеландия' },
          { en: 'Ireland', ru: 'Ирландия' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'Which movie features the quote "May the Force be with you"?', ru: 'В каком фильме есть фраза "Да пребудет с тобой Сила"?' },
        options: [
          { en: 'Star Trek', ru: 'Звёздный путь' },
          { en: 'Star Wars', ru: 'Звёздные войны' },
          { en: 'Guardians of the Galaxy', ru: 'Стражи Галактики' },
          { en: 'Dune', ru: 'Дюна' },
        ],
        correctIndex: 1,
      },
    ],
  },

  // ============================================================
  // 5. TECH
  // ============================================================
  {
    slug: 'tech-trivia',
    title: { en: 'Tech & Computing', ru: 'Технологии' },
    description: { en: 'From programming languages to tech giants.', ru: 'От языков программирования до IT-гигантов.' },
    category: { en: 'Technology', ru: 'Технологии' },
    difficulty: 'hard',
    icon: '💻',
    color: '#a78bfa',
    questions: [
      {
        text: { en: 'Who is the co-founder of Microsoft along with Bill Gates?', ru: 'Кто сооснователь Microsoft вместе с Биллом Гейтсом?' },
        options: [
          { en: 'Steve Jobs', ru: 'Стив Джобс' },
          { en: 'Paul Allen', ru: 'Пол Аллен' },
          { en: 'Steve Ballmer', ru: 'Стив Балмер' },
          { en: 'Mark Zuckerberg', ru: 'Марк Цукерберг' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What does "HTTP" stand for?', ru: 'Что означает "HTTP"?' },
        options: [
          { en: 'HyperText Transfer Protocol', ru: 'HyperText Transfer Protocol' },
          { en: 'High Tech Transfer Process', ru: 'High Tech Transfer Process' },
          { en: 'HyperText Transmission Protocol', ru: 'HyperText Transmission Protocol' },
          { en: 'Hyper Transfer Text Protocol', ru: 'Hyper Transfer Text Protocol' },
        ],
        correctIndex: 0,
      },
      {
        text: { en: 'Which programming language was created by Brendan Eich in 1995?', ru: 'Какой язык программирования создал Брендан Айк в 1995?' },
        options: [
          { en: 'Python', ru: 'Python' },
          { en: 'Java', ru: 'Java' },
          { en: 'JavaScript', ru: 'JavaScript' },
          { en: 'Ruby', ru: 'Ruby' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'What does "CPU" stand for?', ru: 'Что означает "CPU"?' },
        options: [
          { en: 'Central Processing Unit', ru: 'Central Processing Unit' },
          { en: 'Computer Personal Unit', ru: 'Computer Personal Unit' },
          { en: 'Central Process Utility', ru: 'Central Process Utility' },
          { en: 'Core Processing Unit', ru: 'Core Processing Unit' },
        ],
        correctIndex: 0,
      },
      {
        text: { en: 'Which company developed the iPhone?', ru: 'Какая компания разработала iPhone?' },
        options: [
          { en: 'Google', ru: 'Google' },
          { en: 'Samsung', ru: 'Samsung' },
          { en: 'Apple', ru: 'Apple' },
          { en: 'Nokia', ru: 'Nokia' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'What year was GitHub founded?', ru: 'В каком году основан GitHub?' },
        options: [
          { en: '2006', ru: '2006' },
          { en: '2008', ru: '2008' },
          { en: '2010', ru: '2010' },
          { en: '2012', ru: '2012' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What is the binary representation of decimal 10?', ru: 'Двоичное представление десятичного 10?' },
        options: [
          { en: '1010', ru: '1010' },
          { en: '1100', ru: '1100' },
          { en: '1001', ru: '1001' },
          { en: '1110', ru: '1110' },
        ],
        correctIndex: 0,
      },
      {
        text: { en: 'Which protocol is used to send emails?', ru: 'Какой протокол используется для отправки email?' },
        options: [
          { en: 'FTP', ru: 'FTP' },
          { en: 'HTTP', ru: 'HTTP' },
          { en: 'SMTP', ru: 'SMTP' },
          { en: 'SSH', ru: 'SSH' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'Who invented the World Wide Web?', ru: 'Кто изобрёл Всемирную паутину?' },
        options: [
          { en: 'Bill Gates', ru: 'Билл Гейтс' },
          { en: 'Steve Jobs', ru: 'Стив Джобс' },
          { en: 'Tim Berners-Lee', ru: 'Тим Бернерс-Ли' },
          { en: 'Vint Cerf', ru: 'Винт Серф' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'What does "SQL" stand for?', ru: 'Что означает "SQL"?' },
        options: [
          { en: 'Structured Query Language', ru: 'Structured Query Language' },
          { en: 'Simple Query Logic', ru: 'Simple Query Logic' },
          { en: 'System Query Language', ru: 'System Query Language' },
          { en: 'Standard Question Language', ru: 'Standard Question Language' },
        ],
        correctIndex: 0,
      },
    ],
  },

  // ============================================================
  // 6. MUSIC
  // ============================================================
  {
    slug: 'music-trivia',
    title: { en: 'Music Trivia', ru: 'Музыка' },
    description: { en: 'From classical to pop, test your musical knowledge.', ru: 'От классики до попа — проверь музыкальные знания.' },
    category: { en: 'Music', ru: 'Музыка' },
    difficulty: 'medium',
    icon: '🎵',
    color: '#fb923c',
    questions: [
      {
        text: { en: 'How many strings does a standard guitar have?', ru: 'Сколько струн у стандартной гитары?' },
        options: [
          { en: '4', ru: '4' },
          { en: '5', ru: '5' },
          { en: '6', ru: '6' },
          { en: '7', ru: '7' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'Which band performed "Bohemian Rhapsody"?', ru: 'Какая группа исполнила "Bohemian Rhapsody"?' },
        options: [
          { en: 'The Beatles', ru: 'The Beatles' },
          { en: 'Queen', ru: 'Queen' },
          { en: 'Led Zeppelin', ru: 'Led Zeppelin' },
          { en: 'Pink Floyd', ru: 'Pink Floyd' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Who composed "The Four Seasons"?', ru: 'Кто написал "Времена года"?' },
        options: [
          { en: 'Mozart', ru: 'Моцарт' },
          { en: 'Beethoven', ru: 'Бетховен' },
          { en: 'Vivaldi', ru: 'Вивальди' },
          { en: 'Bach', ru: 'Бах' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'What instrument has 88 keys?', ru: 'Какой инструмент имеет 88 клавиш?' },
        options: [
          { en: 'Organ', ru: 'Орган' },
          { en: 'Piano', ru: 'Пианино' },
          { en: 'Harpsichord', ru: 'Клавесин' },
          { en: 'Accordion', ru: 'Аккордеон' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Which singer is known as the "King of Pop"?', ru: 'Какого певца называют "Королём поп-музыки"?' },
        options: [
          { en: 'Elvis Presley', ru: 'Элвис Пресли' },
          { en: 'Michael Jackson', ru: 'Майкл Джексон' },
          { en: 'Prince', ru: 'Принс' },
          { en: 'David Bowie', ru: 'Дэвид Боуи' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'In which year did The Beatles break up?', ru: 'В каком году распались The Beatles?' },
        options: [
          { en: '1968', ru: '1968' },
          { en: '1970', ru: '1970' },
          { en: '1972', ru: '1972' },
          { en: '1974', ru: '1974' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What does "forte" mean in music?', ru: 'Что означает "forte" в музыке?' },
        options: [
          { en: 'Soft', ru: 'Тихо' },
          { en: 'Loud', ru: 'Громко' },
          { en: 'Fast', ru: 'Быстро' },
          { en: 'Slow', ru: 'Медленно' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Which composer became deaf later in life?', ru: 'Какой композитор оглох в поздние годы?' },
        options: [
          { en: 'Mozart', ru: 'Моцарт' },
          { en: 'Bach', ru: 'Бах' },
          { en: 'Beethoven', ru: 'Бетховен' },
          { en: 'Chopin', ru: 'Шопен' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'How many musicians are in a string quartet?', ru: 'Сколько музыкантов в струнном квартете?' },
        options: [
          { en: '3', ru: '3' },
          { en: '4', ru: '4' },
          { en: '5', ru: '5' },
          { en: '6', ru: '6' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Which band released the album "Dark Side of the Moon"?', ru: 'Какая группа выпустила альбом "Dark Side of the Moon"?' },
        options: [
          { en: 'Pink Floyd', ru: 'Pink Floyd' },
          { en: 'The Who', ru: 'The Who' },
          { en: 'Rolling Stones', ru: 'Rolling Stones' },
          { en: 'The Doors', ru: 'The Doors' },
        ],
        correctIndex: 0,
      },
    ],
  },

  // ============================================================
  // 7. SPORTS
  // ============================================================
  {
    slug: 'sports-trivia',
    title: { en: 'Sports Trivia', ru: 'Спорт' },
    description: { en: 'Football, basketball, Olympics and more.', ru: 'Футбол, баскетбол, Олимпиада и другое.' },
    category: { en: 'Sports', ru: 'Спорт' },
    difficulty: 'medium',
    icon: '⚽',
    color: '#22d3ee',
    questions: [
      {
        text: { en: 'How many players are on a soccer team (on field)?', ru: 'Сколько игроков в футбольной команде (на поле)?' },
        options: [
          { en: '9', ru: '9' },
          { en: '10', ru: '10' },
          { en: '11', ru: '11' },
          { en: '12', ru: '12' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'In which sport would you perform a "slam dunk"?', ru: 'В каком виде спорта выполняют "слэм-данк"?' },
        options: [
          { en: 'Volleyball', ru: 'Волейбол' },
          { en: 'Basketball', ru: 'Баскетбол' },
          { en: 'Tennis', ru: 'Теннис' },
          { en: 'Baseball', ru: 'Бейсбол' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'How often are the Summer Olympics held?', ru: 'Как часто проходят Летние Олимпийские игры?' },
        options: [
          { en: 'Every 2 years', ru: 'Каждые 2 года' },
          { en: 'Every 3 years', ru: 'Каждые 3 года' },
          { en: 'Every 4 years', ru: 'Каждые 4 года' },
          { en: 'Every 5 years', ru: 'Каждые 5 лет' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'Which country won the FIFA World Cup in 2022?', ru: 'Какая страна выиграла ЧМ по футболу 2022?' },
        options: [
          { en: 'France', ru: 'Франция' },
          { en: 'Brazil', ru: 'Бразилия' },
          { en: 'Argentina', ru: 'Аргентина' },
          { en: 'Germany', ru: 'Германия' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'How many points is a touchdown worth in American football?', ru: 'Сколько очков даёт тачдаун в американском футболе?' },
        options: [
          { en: '3', ru: '3' },
          { en: '6', ru: '6' },
          { en: '7', ru: '7' },
          { en: '10', ru: '10' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'In tennis, what is a score of zero called?', ru: 'В теннисе как называется счёт "ноль"?' },
        options: [
          { en: 'Zero', ru: 'Зеро' },
          { en: 'Nil', ru: 'Нил' },
          { en: 'Love', ru: 'Лав' },
          { en: 'Nothing', ru: 'Насинг' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'Which sport uses terms "spare" and "strike"?', ru: 'В каком виде спорта есть термины "spare" и "strike"?' },
        options: [
          { en: 'Cricket', ru: 'Крикет' },
          { en: 'Bowling', ru: 'Боулинг' },
          { en: 'Baseball', ru: 'Бейсбол' },
          { en: 'Golf', ru: 'Гольф' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'How many holes are on a standard golf course?', ru: 'Сколько лунок на стандартном поле для гольфа?' },
        options: [
          { en: '9', ru: '9' },
          { en: '12', ru: '12' },
          { en: '18', ru: '18' },
          { en: '24', ru: '24' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'Which boxer was famously known as "The Greatest"?', ru: 'Какого боксёра называли "Величайшим"?' },
        options: [
          { en: 'Mike Tyson', ru: 'Майк Тайсон' },
          { en: 'Muhammad Ali', ru: 'Мохаммед Али' },
          { en: 'Sugar Ray Leonard', ru: 'Шугар Рэй Леонард' },
          { en: 'George Foreman', ru: 'Джордж Форман' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What is the maximum score possible in a single game of bowling?', ru: 'Максимальный счёт за одну игру в боулинге?' },
        options: [
          { en: '200', ru: '200' },
          { en: '250', ru: '250' },
          { en: '300', ru: '300' },
          { en: '350', ru: '350' },
        ],
        correctIndex: 2,
      },
    ],
  },

  // ============================================================
  // 8. LITERATURE
  // ============================================================
  {
    slug: 'literature-trivia',
    title: { en: 'Literature Classics', ru: 'Классическая литература' },
    description: { en: 'Famous authors, books, and characters.', ru: 'Известные авторы, книги и персонажи.' },
    category: { en: 'Literature', ru: 'Литература' },
    difficulty: 'hard',
    icon: '📚',
    color: '#facc15',
    questions: [
      {
        text: { en: 'Who wrote "Romeo and Juliet"?', ru: 'Кто написал "Ромео и Джульетту"?' },
        options: [
          { en: 'Charles Dickens', ru: 'Чарльз Диккенс' },
          { en: 'William Shakespeare', ru: 'Уильям Шекспир' },
          { en: 'Jane Austen', ru: 'Джейн Остин' },
          { en: 'Mark Twain', ru: 'Марк Твен' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'In which book would you find the character "Atticus Finch"?', ru: 'В какой книге есть персонаж "Аттикус Финч"?' },
        options: [
          { en: '1984', ru: '1984' },
          { en: 'To Kill a Mockingbird', ru: 'Убить пересмешника' },
          { en: 'The Great Gatsby', ru: 'Великий Гэтсби' },
          { en: 'Pride and Prejudice', ru: 'Гордость и предубеждение' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Who wrote "Crime and Punishment"?', ru: 'Кто написал "Преступление и наказание"?' },
        options: [
          { en: 'Leo Tolstoy', ru: 'Лев Толстой' },
          { en: 'Fyodor Dostoevsky', ru: 'Фёдор Достоевский' },
          { en: 'Anton Chekhov', ru: 'Антон Чехов' },
          { en: 'Ivan Turgenev', ru: 'Иван Тургенев' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What is the first book of the Harry Potter series?', ru: 'Какая первая книга серии о Гарри Поттере?' },
        options: [
          { en: 'Chamber of Secrets', ru: 'Тайная комната' },
          { en: 'Prisoner of Azkaban', ru: 'Узник Азкабана' },
          { en: "Sorcerer's Stone", ru: 'Философский камень' },
          { en: 'Goblet of Fire', ru: 'Кубок огня' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'Who wrote "The Old Man and the Sea"?', ru: 'Кто написал "Старик и море"?' },
        options: [
          { en: 'John Steinbeck', ru: 'Джон Стейнбек' },
          { en: 'Ernest Hemingway', ru: 'Эрнест Хемингуэй' },
          { en: 'F. Scott Fitzgerald', ru: 'Фрэнсис Скотт Фицджеральд' },
          { en: 'William Faulkner', ru: 'Уильям Фолкнер' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'In "1984", what is the name of the totalitarian leader?', ru: 'В "1984" как зовут тоталитарного лидера?' },
        options: [
          { en: 'Big Brother', ru: 'Большой Брат' },
          { en: 'The Party', ru: 'Партия' },
          { en: "O'Brien", ru: "О'Брайен" },
          { en: 'Emmanuel Goldstein', ru: 'Эммануэль Голдстейн' },
        ],
        correctIndex: 0,
      },
      {
        text: { en: 'Who is the author of "Pride and Prejudice"?', ru: 'Кто автор "Гордости и предубеждения"?' },
        options: [
          { en: 'Charlotte Brontë', ru: 'Шарлотта Бронте' },
          { en: 'Emily Brontë', ru: 'Эмили Бронте' },
          { en: 'Jane Austen', ru: 'Джейн Остин' },
          { en: 'Mary Shelley', ru: 'Мэри Шелли' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'Which novel features the character "Jay Gatsby"?', ru: 'В каком романе есть персонаж "Джей Гэтсби"?' },
        options: [
          { en: 'The Sun Also Rises', ru: 'И восходит солнце' },
          { en: 'The Great Gatsby', ru: 'Великий Гэтсби' },
          { en: 'Tender Is the Night', ru: 'Ночь нежна' },
          { en: 'This Side of Paradise', ru: 'По ту сторону рая' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Who wrote "Don Quixote"?', ru: 'Кто написал "Дон Кихота"?' },
        options: [
          { en: 'Miguel de Cervantes', ru: 'Мигель де Сервантес' },
          { en: 'Gabriel García Márquez', ru: 'Габриэль Гарсиа Маркес' },
          { en: 'Pablo Neruda', ru: 'Пабло Неруда' },
          { en: 'Jorge Luis Borges', ru: 'Хорхе Луис Борхес' },
        ],
        correctIndex: 0,
      },
      {
        text: { en: 'In "The Lord of the Rings", what is the name of the hobbit protagonist?', ru: 'В "Властелине колец" как зовут хоббита-протагониста?' },
        options: [
          { en: 'Bilbo Baggins', ru: 'Бильбо Бэггинс' },
          { en: 'Frodo Baggins', ru: 'Фродо Бэггинс' },
          { en: 'Samwise Gamgee', ru: 'Сэмуайз Гэмджи' },
          { en: 'Merry Brandybuck', ru: 'Мерри Брендибак' },
        ],
        correctIndex: 1,
      },
    ],
  },

  // ============================================================
  // 9. SPACE — НОВЫЙ
  // ============================================================
  {
    slug: 'space-trivia',
    title: { en: 'Space & Universe', ru: 'Космос' },
    description: { en: 'Explore planets, stars, galaxies, and cosmic phenomena.', ru: 'Планеты, звёзды, галактики и космические явления.' },
    category: { en: 'Science', ru: 'Наука' },
    difficulty: 'medium',
    icon: '🚀',
    color: '#818cf8',
    questions: [
      {
        text: { en: 'Which planet is known as the Red Planet?', ru: 'Какую планету называют Красной?' },
        options: [
          { en: 'Venus', ru: 'Венера' },
          { en: 'Mars', ru: 'Марс' },
          { en: 'Jupiter', ru: 'Юпитер' },
          { en: 'Mercury', ru: 'Меркурий' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What is the largest planet in our solar system?', ru: 'Самая большая планета Солнечной системы?' },
        options: [
          { en: 'Saturn', ru: 'Сатурн' },
          { en: 'Neptune', ru: 'Нептун' },
          { en: 'Jupiter', ru: 'Юпитер' },
          { en: 'Uranus', ru: 'Уран' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'How long does light take to travel from the Sun to Earth?', ru: 'За сколько свет доходит от Солнца до Земли?' },
        options: [
          { en: '8 seconds', ru: '8 секунд' },
          { en: '8 minutes', ru: '8 минут' },
          { en: '8 hours', ru: '8 часов' },
          { en: '8 days', ru: '8 дней' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What galaxy is Earth located in?', ru: 'В какой галактике находится Земля?' },
        options: [
          { en: 'Andromeda', ru: 'Андромеда' },
          { en: 'Milky Way', ru: 'Млечный Путь' },
          { en: 'Whirlpool', ru: 'Водоворот' },
          { en: 'Sombrero', ru: 'Сомбреро' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Who was the first human to walk on the Moon?', ru: 'Кто первым ступил на Луну?' },
        options: [
          { en: 'Buzz Aldrin', ru: 'Базз Олдрин' },
          { en: 'Yuri Gagarin', ru: 'Юрий Гагарин' },
          { en: 'Neil Armstrong', ru: 'Нил Армстронг' },
          { en: 'Michael Collins', ru: 'Майкл Коллинз' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'What is a "light-year" a measure of?', ru: 'Что измеряет "световой год"?' },
        options: [
          { en: 'Time', ru: 'Время' },
          { en: 'Distance', ru: 'Расстояние' },
          { en: 'Brightness', ru: 'Яркость' },
          { en: 'Energy', ru: 'Энергию' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Which planet has the most prominent rings?', ru: 'У какой планеты самые заметные кольца?' },
        options: [
          { en: 'Jupiter', ru: 'Юпитер' },
          { en: 'Uranus', ru: 'Уран' },
          { en: 'Saturn', ru: 'Сатурн' },
          { en: 'Neptune', ru: 'Нептун' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'What is the closest star to Earth (excluding the Sun)?', ru: 'Какая звезда ближайшая к Земле (кроме Солнца)?' },
        options: [
          { en: 'Sirius', ru: 'Сириус' },
          { en: 'Proxima Centauri', ru: 'Проксима Центавра' },
          { en: 'Polaris', ru: 'Полярная звезда' },
          { en: 'Betelgeuse', ru: 'Бетельгейзе' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What is the term for a dying star that explodes?', ru: 'Как называется взрыв умирающей звезды?' },
        options: [
          { en: 'Nova', ru: 'Нова' },
          { en: 'Supernova', ru: 'Сверхновая' },
          { en: 'Black hole', ru: 'Чёрная дыра' },
          { en: 'Pulsar', ru: 'Пульсар' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'How many moons does Earth have?', ru: 'Сколько лун у Земли?' },
        options: [
          { en: '0', ru: '0' },
          { en: '1', ru: '1' },
          { en: '2', ru: '2' },
          { en: '3', ru: '3' },
        ],
        correctIndex: 1,
      },
    ],
  },

  // ============================================================
  // 10. NATURE — НОВЫЙ
  // ============================================================
  {
    slug: 'nature-trivia',
    title: { en: 'Nature & Animals', ru: 'Природа и животные' },
    description: { en: 'Wildlife, ecosystems, and natural wonders.', ru: 'Дикая природа, экосистемы и чудеса природы.' },
    category: { en: 'Nature', ru: 'Природа' },
    difficulty: 'easy',
    icon: '🦁',
    color: '#84cc16',
    questions: [
      {
        text: { en: 'What is the largest land animal?', ru: 'Самое большое наземное животное?' },
        options: [
          { en: 'African Elephant', ru: 'Африканский слон' },
          { en: 'Hippopotamus', ru: 'Бегемот' },
          { en: 'Giraffe', ru: 'Жираф' },
          { en: 'Rhinoceros', ru: 'Носорог' },
        ],
        correctIndex: 0,
      },
      {
        text: { en: 'How many hearts does an octopus have?', ru: 'Сколько сердец у осьминога?' },
        options: [
          { en: '1', ru: '1' },
          { en: '2', ru: '2' },
          { en: '3', ru: '3' },
          { en: '4', ru: '4' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'What is the fastest land animal?', ru: 'Самое быстрое наземное животное?' },
        options: [
          { en: 'Lion', ru: 'Лев' },
          { en: 'Cheetah', ru: 'Гепард' },
          { en: 'Horse', ru: 'Лошадь' },
          { en: 'Antelope', ru: 'Антилопа' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Which bird is known for its colorful tail feathers?', ru: 'Какая птица известна красочным хвостом?' },
        options: [
          { en: 'Eagle', ru: 'Орёл' },
          { en: 'Peacock', ru: 'Павлин' },
          { en: 'Sparrow', ru: 'Воробей' },
          { en: 'Owl', ru: 'Сова' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What is the largest ocean ecosystem?', ru: 'Какая самая большая экосистема океана?' },
        options: [
          { en: 'Coral Reef', ru: 'Коралловый риф' },
          { en: 'Kelp Forest', ru: 'Лес водорослей' },
          { en: 'Deep Sea', ru: 'Глубоководная' },
          { en: 'Arctic', ru: 'Арктическая' },
        ],
        correctIndex: 0,
        explanation: { en: 'The Great Barrier Reef is the largest coral reef system.', ru: 'Большой Барьерный риф — крупнейшая система коралловых рифов.' },
      },
      {
        text: { en: 'Which animal is known as the "King of the Jungle"?', ru: 'Какое животное называют "Царём джунглей"?' },
        options: [
          { en: 'Tiger', ru: 'Тигр' },
          { en: 'Lion', ru: 'Лев' },
          { en: 'Elephant', ru: 'Слон' },
          { en: 'Gorilla', ru: 'Горилла' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'How many legs does a spider have?', ru: 'Сколько ног у паука?' },
        options: [
          { en: '6', ru: '6' },
          { en: '8', ru: '8' },
          { en: '10', ru: '10' },
          { en: '12', ru: '12' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What is the tallest tree species?', ru: 'Самый высокий вид деревьев?' },
        options: [
          { en: 'Oak', ru: 'Дуб' },
          { en: 'Pine', ru: 'Сосна' },
          { en: 'Redwood', ru: 'Секвойя' },
          { en: 'Maple', ru: 'Клён' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'Which animal can change its color for camouflage?', ru: 'Какое животное меняет цвет для маскировки?' },
        options: [
          { en: 'Frog', ru: 'Лягушка' },
          { en: 'Chameleon', ru: 'Хамелеон' },
          { en: 'Snake', ru: 'Змея' },
          { en: 'Iguana', ru: 'Игуана' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What do bees collect from flowers?', ru: 'Что пчёлы собирают с цветов?' },
        options: [
          { en: 'Pollen and nectar', ru: 'Пыльцу и нектар' },
          { en: 'Leaves', ru: 'Листья' },
          { en: 'Water', ru: 'Воду' },
          { en: 'Seeds', ru: 'Семена' },
        ],
        correctIndex: 0,
      },
    ],
  },

  // ============================================================
  // 11. FOOD — НОВЫЙ
  // ============================================================
  {
    slug: 'food-trivia',
    title: { en: 'Food & Cuisine', ru: 'Еда и кухня' },
    description: { en: 'Dishes, ingredients, and culinary traditions from around the world.', ru: 'Блюда, ингредиенты и кулинарные традиции со всего мира.' },
    category: { en: 'Food', ru: 'Еда' },
    difficulty: 'easy',
    icon: '🍕',
    color: '#ef4444',
    questions: [
      {
        text: { en: 'Which country is the origin of pizza?', ru: 'В какой стране возникла пицца?' },
        options: [
          { en: 'France', ru: 'Франция' },
          { en: 'Italy', ru: 'Италия' },
          { en: 'Greece', ru: 'Греция' },
          { en: 'Spain', ru: 'Испания' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What is the main ingredient in guacamole?', ru: 'Главный ингредиент гуакамоле?' },
        options: [
          { en: 'Tomato', ru: 'Помидор' },
          { en: 'Avocado', ru: 'Авокадо' },
          { en: 'Pepper', ru: 'Перец' },
          { en: 'Onion', ru: 'Лук' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Which spice is the most expensive in the world?', ru: 'Какая самая дорогая пряность в мире?' },
        options: [
          { en: 'Vanilla', ru: 'Ваниль' },
          { en: 'Saffron', ru: 'Шафран' },
          { en: 'Cardamom', ru: 'Кардамон' },
          { en: 'Cinnamon', ru: 'Корица' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What is sushi traditionally wrapped in?', ru: 'В чём традиционно заворачивают суши?' },
        options: [
          { en: 'Rice paper', ru: 'Рисовая бумага' },
          { en: 'Seaweed (nori)', ru: 'Водоросли (нори)' },
          { en: 'Lettuce', ru: 'Салат' },
          { en: 'Soy wrapper', ru: 'Соевая обёртка' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Which country produces the most coffee?', ru: 'Какая страна производит больше всего кофе?' },
        options: [
          { en: 'Colombia', ru: 'Колумбия' },
          { en: 'Vietnam', ru: 'Вьетнам' },
          { en: 'Brazil', ru: 'Бразилия' },
          { en: 'Ethiopia', ru: 'Эфиопия' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'What is the main ingredient in hummus?', ru: 'Главный ингредиент хумуса?' },
        options: [
          { en: 'Lentils', ru: 'Чечевица' },
          { en: 'Chickpeas', ru: 'Нут' },
          { en: 'Beans', ru: 'Фасоль' },
          { en: 'Peas', ru: 'Горох' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Which fruit is known as the "king of fruits"?', ru: 'Какой фрукт называют "королём фруктов"?' },
        options: [
          { en: 'Mango', ru: 'Манго' },
          { en: 'Durian', ru: 'Дуриан' },
          { en: 'Pineapple', ru: 'Ананас' },
          { en: 'Apple', ru: 'Яблоко' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What gives pasta its yellow color?', ru: 'Что придаёт пасте жёлтый цвет?' },
        options: [
          { en: 'Butter', ru: 'Масло' },
          { en: 'Egg yolk', ru: 'Желток' },
          { en: 'Saffron', ru: 'Шафран' },
          { en: 'Cheese', ru: 'Сыр' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Which country is famous for paella?', ru: 'Какая страна известна паэльей?' },
        options: [
          { en: 'Mexico', ru: 'Мексика' },
          { en: 'Spain', ru: 'Испания' },
          { en: 'Italy', ru: 'Италия' },
          { en: 'Portugal', ru: 'Португалия' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What is the main ingredient in tofu?', ru: 'Главный ингредиент тофу?' },
        options: [
          { en: 'Rice', ru: 'Рис' },
          { en: 'Soy milk', ru: 'Соевое молоко' },
          { en: 'Wheat', ru: 'Пшеница' },
          { en: 'Coconut', ru: 'Кокос' },
        ],
        correctIndex: 1,
      },
    ],
  },

  // ============================================================
  // 12. ART — НОВЫЙ
  // ============================================================
  {
    slug: 'art-trivia',
    title: { en: 'Art & Painting', ru: 'Искусство' },
    description: { en: 'Famous paintings, artists, and art movements.', ru: 'Известные картины, художники и направления.' },
    category: { en: 'Art', ru: 'Искусство' },
    difficulty: 'hard',
    icon: '🎨',
    color: '#ec4899',
    questions: [
      {
        text: { en: 'Who painted "The Starry Night"?', ru: 'Кто написал "Звёздную ночь"?' },
        options: [
          { en: 'Claude Monet', ru: 'Клод Моне' },
          { en: 'Vincent van Gogh', ru: 'Винсент Ван Гог' },
          { en: 'Pablo Picasso', ru: 'Пабло Пикассо' },
          { en: 'Salvador Dalí', ru: 'Сальвадор Дали' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Which art movement is Salvador Dalí associated with?', ru: 'С каким направлением связан Сальвадор Дали?' },
        options: [
          { en: 'Cubism', ru: 'Кубизм' },
          { en: 'Impressionism', ru: 'Импрессионизм' },
          { en: 'Surrealism', ru: 'Сюрреализм' },
          { en: 'Realism', ru: 'Реализм' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'Where is the Mona Lisa displayed?', ru: 'Где выставлена Мона Лиза?' },
        options: [
          { en: 'British Museum, London', ru: 'Британский музей, Лондон' },
          { en: 'Louvre, Paris', ru: 'Лувр, Париж' },
          { en: 'MoMA, New York', ru: 'MoMA, Нью-Йорк' },
          { en: 'Uffizi, Florence', ru: 'Уффици, Флоренция' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Who is famous for the "Campbell\'s Soup Cans" artwork?', ru: 'Кто известен работой "Банки супа Кэмпбелл"?' },
        options: [
          { en: 'Andy Warhol', ru: 'Энди Уорхол' },
          { en: 'Roy Lichtenstein', ru: 'Рой Лихтенштейн' },
          { en: 'Keith Haring', ru: 'Кит Херинг' },
          { en: 'Jean-Michel Basquiat', ru: 'Жан-Мишель Баския' },
        ],
        correctIndex: 0,
      },
      {
        text: { en: 'Which artist cut off his own ear?', ru: 'Какой художник отрезал себе ухо?' },
        options: [
          { en: 'Paul Gauguin', ru: 'Поль Гоген' },
          { en: 'Vincent van Gogh', ru: 'Винсент Ван Гог' },
          { en: 'Edvard Munch', ru: 'Эдвард Мунк' },
          { en: 'Henri Matisse', ru: 'Анри Матисс' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What is the famous sculpture by Michelangelo in the Sistine Chapel?', ru: 'Какая знаменитая скульптура Микеланджело в Сикстинской капелле?' },
        options: [
          { en: 'David', ru: 'Давид' },
          { en: 'The Pietà', ru: 'Пьета' },
          { en: 'The Last Judgment (painting)', ru: 'Страшный суд (фреска)' },
          { en: 'Moses', ru: 'Моисей' },
        ],
        correctIndex: 2,
        explanation: { en: 'The Sistine Chapel ceiling and "The Last Judgment" are paintings, not sculptures.', ru: 'Потолок Сикстинской капеллы и "Страшный суд" — фрески, не скульптуры.' },
      },
      {
        text: { en: 'Which movement is Claude Monet associated with?', ru: 'С каким направлением связан Клод Моне?' },
        options: [
          { en: 'Cubism', ru: 'Кубизм' },
          { en: 'Impressionism', ru: 'Импрессионизм' },
          { en: 'Baroque', ru: 'Барокко' },
          { en: 'Romanticism', ru: 'Романтизм' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Who painted "The Persistence of Memory" (melting clocks)?', ru: 'Кто написал "Постоянство памяти" (тающие часы)?' },
        options: [
          { en: 'René Magritte', ru: 'Рене Магритт' },
          { en: 'Salvador Dalí', ru: 'Сальвадор Дали' },
          { en: 'Max Ernst', ru: 'Макс Эрнст' },
          { en: 'Joan Miró', ru: 'Жоан Миро' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What is the famous pose in Leonardo da Vinci\'s "Vitruvian Man"?', ru: 'Какая поза в "Витрувианском человеке" Леонардо да Винчи?' },
        options: [
          { en: 'Sitting', ru: 'Сидя' },
          { en: 'Two superimposed positions (circle + square)', ru: 'Две наложенные позы (круг + квадрат)' },
          { en: 'Running', ru: 'Бег' },
          { en: 'Lying down', ru: 'Лёжа' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Which artist is known for the "drip painting" technique?', ru: 'Какой художник известен техникой "капельная живопись"?' },
        options: [
          { en: 'Jackson Pollock', ru: 'Джексон Поллок' },
          { en: 'Mark Rothko', ru: 'Марк Ротко' },
          { en: 'Willem de Kooning', ru: 'Виллем де Кунинг' },
          { en: 'Franz Kline', ru: 'Франц Клайн' },
        ],
        correctIndex: 0,
      },
    ],
  },

  // ============================================================
  // 13. VIDEO GAMES — НОВЫЙ
  // ============================================================
  {
    slug: 'video-games-trivia',
    title: { en: 'Video Games', ru: 'Видеоигры' },
    description: { en: 'From classic arcade to modern masterpieces.', ru: 'От классических аркад до современных шедевров.' },
    category: { en: 'Games', ru: 'Игры' },
    difficulty: 'medium',
    icon: '🎮',
    color: '#10b981',
    questions: [
      {
        text: { en: 'Which company developed the Mario franchise?', ru: 'Какая компания создала франшизу Mario?' },
        options: [
          { en: 'Sega', ru: 'Sega' },
          { en: 'Sony', ru: 'Sony' },
          { en: 'Nintendo', ru: 'Nintendo' },
          { en: 'Microsoft', ru: 'Microsoft' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'What is the best-selling video game of all time?', ru: 'Какая видеоигра самая продаваемая за всё время?' },
        options: [
          { en: 'Tetris', ru: 'Тетрис' },
          { en: 'Minecraft', ru: 'Minecraft' },
          { en: 'Grand Theft Auto V', ru: 'GTA V' },
          { en: 'Wii Sports', ru: 'Wii Sports' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'In which game would you find the character "Master Chief"?', ru: 'В какой игре есть персонаж "Мастер Чиф"?' },
        options: [
          { en: 'Destiny', ru: 'Destiny' },
          { en: 'Halo', ru: 'Halo' },
          { en: 'Call of Duty', ru: 'Call of Duty' },
          { en: 'Mass Effect', ru: 'Mass Effect' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What year was the original PlayStation released?', ru: 'В каком году вышла оригинальная PlayStation?' },
        options: [
          { en: '1992', ru: '1992' },
          { en: '1994', ru: '1994' },
          { en: '1996', ru: '1996' },
          { en: '1998', ru: '1998' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Which game features the blocky character "Steve"?', ru: 'В какой игре есть блочный персонаж "Стив"?' },
        options: [
          { en: 'Roblox', ru: 'Roblox' },
          { en: 'Terraria', ru: 'Terraria' },
          { en: 'Minecraft', ru: 'Minecraft' },
          { en: 'Lego Worlds', ru: 'Lego Worlds' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'What does "RPG" stand for in gaming?', ru: 'Что означает "RPG" в играх?' },
        options: [
          { en: 'Rapid Play Game', ru: 'Rapid Play Game' },
          { en: 'Role-Playing Game', ru: 'Role-Playing Game' },
          { en: 'Real Player Game', ru: 'Real Player Game' },
          { en: 'Random Path Generator', ru: 'Random Path Generator' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Which game is set in the world of "Azeroth"?', ru: 'Какая игра происходит в мире "Азерот"?' },
        options: [
          { en: 'Elder Scrolls', ru: 'Elder Scrolls' },
          { en: 'World of Warcraft', ru: 'World of Warcraft' },
          { en: 'Diablo', ru: 'Diablo' },
          { en: 'Final Fantasy', ru: 'Final Fantasy' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Who is the main character of "The Legend of Zelda" series?', ru: 'Главный герой серии "The Legend of Zelda"?' },
        options: [
          { en: 'Zelda', ru: 'Зельда' },
          { en: 'Link', ru: 'Линк' },
          { en: 'Ganon', ru: 'Ганон' },
          { en: 'Sheik', ru: 'Шейк' },
        ],
        correctIndex: 1,
        explanation: { en: 'Zelda is the princess — Link is the hero!', ru: 'Зельда — принцесса, Линк — герой!' },
      },
      {
        text: { en: 'Which console was the first to use motion controls?', ru: 'Какая консоль первой использовала управление движениями?' },
        options: [
          { en: 'Xbox 360', ru: 'Xbox 360' },
          { en: 'PS3', ru: 'PS3' },
          { en: 'Nintendo Wii', ru: 'Nintendo Wii' },
          { en: 'Switch', ru: 'Switch' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'What is the name of the AI villain in "Portal"?', ru: 'Как зовут ИИ-злодея в "Portal"?' },
        options: [
          { en: 'Cortana', ru: 'Кортана' },
          { en: 'GLaDOS', ru: 'GLaDOS' },
          { en: 'SHODAN', ru: 'SHODAN' },
          { en: 'Siri', ru: 'Siri' },
        ],
        correctIndex: 1,
      },
    ],
  },

  // ============================================================
  // 14. MYTHOLOGY — НОВЫЙ
  // ============================================================
  {
    slug: 'mythology-trivia',
    title: { en: 'Mythology', ru: 'Мифология' },
    description: { en: 'Gods, heroes, and legends from ancient myths.', ru: 'Боги, герои и легенды древних мифов.' },
    category: { en: 'History', ru: 'История' },
    difficulty: 'hard',
    icon: '⚡',
    color: '#eab308',
    questions: [
      {
        text: { en: 'Who is the king of the gods in Greek mythology?', ru: 'Кто царь богов в греческой мифологии?' },
        options: [
          { en: 'Poseidon', ru: 'Посейдон' },
          { en: 'Hades', ru: 'Аид' },
          { en: 'Zeus', ru: 'Зевс' },
          { en: 'Apollo', ru: 'Аполлон' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'What is the name of the Norse god of thunder?', ru: 'Как зовут скандинавского бога грома?' },
        options: [
          { en: 'Odin', ru: 'Один' },
          { en: 'Loki', ru: 'Локи' },
          { en: 'Thor', ru: 'Тор' },
          { en: 'Freyr', ru: 'Фрейр' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'Who is the Roman equivalent of the Greek god Ares?', ru: 'Кто римский аналог греческого бога Ареса?' },
        options: [
          { en: 'Mars', ru: 'Марс' },
          { en: 'Jupiter', ru: 'Юпитер' },
          { en: 'Mercury', ru: 'Меркурий' },
          { en: 'Vulcan', ru: 'Вулкан' },
        ],
        correctIndex: 0,
      },
      {
        text: { en: 'What creature is half-man, half-bull in Greek myth?', ru: 'Какое существо получеловек-полубык в греческих мифах?' },
        options: [
          { en: 'Centaur', ru: 'Кентавр' },
          { en: 'Minotaur', ru: 'Минотавр' },
          { en: 'Sphinx', ru: 'Сфинкс' },
          { en: 'Satyr', ru: 'Сатир' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Who killed Medusa in Greek mythology?', ru: 'Кто убил Медузу Горгону в греческой мифологии?' },
        options: [
          { en: 'Heracles', ru: 'Геракл' },
          { en: 'Perseus', ru: 'Персей' },
          { en: 'Theseus', ru: 'Тесей' },
          { en: 'Achilles', ru: 'Ахиллес' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What is the name of the Norse end-of-the-world event?', ru: 'Как называется конец света в скандинавской мифологии?' },
        options: [
          { en: 'Ragnarök', ru: 'Рагнарёк' },
          { en: 'Apocalypse', ru: 'Апокалипсис' },
          { en: 'Twilight', ru: 'Сумерки' },
          { en: 'Olympus', ru: 'Олимп' },
        ],
        correctIndex: 0,
      },
      {
        text: { en: 'Who is the Egyptian god of the afterlife?', ru: 'Кто египетский бог загробного мира?' },
        options: [
          { en: 'Ra', ru: 'Ра' },
          { en: 'Anubis', ru: 'Анубис' },
          { en: 'Horus', ru: 'Гор' },
          { en: 'Osiris', ru: 'Осирис' },
        ],
        correctIndex: 3,
      },
      {
        text: { en: 'What was Achilles\' vulnerable spot?', ru: 'Какое место было уязвимым у Ахиллеса?' },
        options: [
          { en: 'His heel', ru: 'Пятка' },
          { en: 'His heart', ru: 'Сердце' },
          { en: 'His neck', ru: 'Шея' },
          { en: 'His hand', ru: 'Рука' },
        ],
        correctIndex: 0,
      },
      {
        text: { en: 'Who is the Greek goddess of wisdom?', ru: 'Кто греческая богиня мудрости?' },
        options: [
          { en: 'Aphrodite', ru: 'Афродита' },
          { en: 'Artemis', ru: 'Артемида' },
          { en: 'Athena', ru: 'Афина' },
          { en: 'Hera', ru: 'Гера' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'What creature has the body of a lion and head of a human?', ru: 'У какого существа тело льва и голова человека?' },
        options: [
          { en: 'Griffin', ru: 'Грифон' },
          { en: 'Sphinx', ru: 'Сфинкс' },
          { en: 'Chimera', ru: 'Химера' },
          { en: 'Manticore', ru: 'Мантикора' },
        ],
        correctIndex: 1,
      },
    ],
  },

  // ============================================================
  // 15. RUSSIAN CULTURE — НОВЫЙ (специально для русскоязычных)
  // ============================================================
  {
    slug: 'russian-culture',
    title: { en: 'Russian Culture', ru: 'Русская культура' },
    description: { en: 'Literature, history, and traditions of Russia.', ru: 'Литература, история и традиции России.' },
    category: { en: 'History', ru: 'История' },
    difficulty: 'medium',
    icon: '🇷🇺',
    color: '#dc2626',
    questions: [
      {
        text: { en: 'Who wrote "War and Peace"?', ru: 'Кто написал "Войну и мир"?' },
        options: [
          { en: 'Fyodor Dostoevsky', ru: 'Фёдор Достоевский' },
          { en: 'Leo Tolstoy', ru: 'Лев Толстой' },
          { en: 'Anton Chekhov', ru: 'Антон Чехов' },
          { en: 'Ivan Turgenev', ru: 'Иван Тургенев' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What is the capital of Russia?', ru: 'Столица России?' },
        options: [
          { en: 'Saint Petersburg', ru: 'Санкт-Петербург' },
          { en: 'Moscow', ru: 'Москва' },
          { en: 'Kazan', ru: 'Казань' },
          { en: 'Novosibirsk', ru: 'Новосибирск' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Who composed "Swan Lake"?', ru: 'Кто написал "Лебединое озеро"?' },
        options: [
          { en: 'Rimsky-Korsakov', ru: 'Римский-Корсаков' },
          { en: 'Pyotr Tchaikovsky', ru: 'Пётр Чайковский' },
          { en: 'Mussorgsky', ru: 'Мусоргский' },
          { en: 'Rachmaninoff', ru: 'Рахманинов' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Which Russian ruler was known as "the Great"?', ru: 'Какой русский правитель известен как "Великий"?' },
        options: [
          { en: 'Ivan IV', ru: 'Иван IV' },
          { en: 'Peter I', ru: 'Пётр I' },
          { en: 'Nicholas II', ru: 'Николай II' },
          { en: 'Alexander I', ru: 'Александр I' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What is the traditional Russian soup called?', ru: 'Как называется традиционный русский суп?' },
        options: [
          { en: 'Solyanka', ru: 'Солянка' },
          { en: 'Borscht', ru: 'Борщ' },
          { en: 'Okroshka', ru: 'Окрошка' },
          { en: 'All of the above', ru: 'Все перечисленные' },
        ],
        correctIndex: 3,
      },
      {
        text: { en: 'Who wrote "Eugene Onegin"?', ru: 'Кто написал "Евгения Онегина"?' },
        options: [
          { en: 'Mikhail Lermontov', ru: 'Михаил Лермонтов' },
          { en: 'Alexander Pushkin', ru: 'Александр Пушкин' },
          { en: 'Nikolai Gogol', ru: 'Николай Гоголь' },
          { en: 'Vladimir Mayakovsky', ru: 'Владимир Маяковский' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'In which year did the October Revolution take place?', ru: 'В каком году произошла Октябрьская революция?' },
        options: [
          { en: '1905', ru: '1905' },
          { en: '1914', ru: '1914' },
          { en: '1917', ru: '1917' },
          { en: '1922', ru: '1922' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'What is the largest country in the world by area?', ru: 'Самая большая страна мира по площади?' },
        options: [
          { en: 'China', ru: 'Китай' },
          { en: 'USA', ru: 'США' },
          { en: 'Canada', ru: 'Канада' },
          { en: 'Russia', ru: 'Россия' },
        ],
        correctIndex: 3,
      },
      {
        text: { en: 'Which Russian writer wrote "The Brothers Karamazov"?', ru: 'Какой русский писатель написал "Братьев Карамазовых"?' },
        options: [
          { en: 'Leo Tolstoy', ru: 'Лев Толстой' },
          { en: 'Fyodor Dostoevsky', ru: 'Фёдор Достоевский' },
          { en: 'Anton Chekhov', ru: 'Антон Чехов' },
          { en: 'Maxim Gorky', ru: 'Максим Горький' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What is the name of the famous Russian ballet company?', ru: 'Как называется знаменитый русский балет?' },
        options: [
          { en: 'Bolshoi Ballet', ru: 'Большой балет' },
          { en: 'Royal Ballet', ru: 'Королевский балет' },
          { en: 'Paris Opera Ballet', ru: 'Парижская опера' },
          { en: 'ABT', ru: 'ABT' },
        ],
        correctIndex: 0,
      },
    ],
  },

  // ============================================================
  // 16. GENERAL KNOWLEDGE — НОВЫЙ (лёгкий, для новичков)
  // ============================================================
  {
    slug: 'general-knowledge',
    title: { en: 'General Knowledge', ru: 'Общие знания' },
    description: { en: 'A mix of easy questions to warm up.', ru: 'Лёгкие вопросы для разминки.' },
    category: { en: 'Mixed', ru: 'Разное' },
    difficulty: 'easy',
    icon: '🧠',
    color: '#06b6d4',
    questions: [
      {
        text: { en: 'How many days are in a week?', ru: 'Сколько дней в неделе?' },
        options: [
          { en: '5', ru: '5' },
          { en: '6', ru: '6' },
          { en: '7', ru: '7' },
          { en: '8', ru: '8' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'What color do you get mixing blue and yellow?', ru: 'Какой цвет получится если смешать синий и жёлтый?' },
        options: [
          { en: 'Green', ru: 'Зелёный' },
          { en: 'Purple', ru: 'Фиолетовый' },
          { en: 'Orange', ru: 'Оранжевый' },
          { en: 'Brown', ru: 'Коричневый' },
        ],
        correctIndex: 0,
      },
      {
        text: { en: 'How many continents are there?', ru: 'Сколько континентов на Земле?' },
        options: [
          { en: '5', ru: '5' },
          { en: '6', ru: '6' },
          { en: '7', ru: '7' },
          { en: '8', ru: '8' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'What is 2 + 2?', ru: 'Сколько будет 2 + 2?' },
        options: [
          { en: '3', ru: '3' },
          { en: '4', ru: '4' },
          { en: '5', ru: '5' },
          { en: '22', ru: '22' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Which animal is known as "man\'s best friend"?', ru: 'Какое животное называют "лучшим другом человека"?' },
        options: [
          { en: 'Cat', ru: 'Кошка' },
          { en: 'Dog', ru: 'Собака' },
          { en: 'Horse', ru: 'Лошадь' },
          { en: 'Cow', ru: 'Корова' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What is the boiling point of water (°C)?', ru: 'Температура кипения воды (°C)?' },
        options: [
          { en: '50', ru: '50' },
          { en: '75', ru: '75' },
          { en: '100', ru: '100' },
          { en: '150', ru: '150' },
        ],
        correctIndex: 2,
      },
      {
        text: { en: 'How many sides does a triangle have?', ru: 'Сколько сторон у треугольника?' },
        options: [
          { en: '2', ru: '2' },
          { en: '3', ru: '3' },
          { en: '4', ru: '4' },
          { en: '5', ru: '5' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'What is the largest mammal?', ru: 'Самое крупное млекопитающее?' },
        options: [
          { en: 'Elephant', ru: 'Слон' },
          { en: 'Blue Whale', ru: 'Синий кит' },
          { en: 'Giraffe', ru: 'Жираф' },
          { en: 'Hippopotamus', ru: 'Бегемот' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'Which season comes after winter?', ru: 'Какое время года после зимы?' },
        options: [
          { en: 'Summer', ru: 'Лето' },
          { en: 'Spring', ru: 'Весна' },
          { en: 'Autumn', ru: 'Осень' },
          { en: 'Monsoon', ru: 'Муссон' },
        ],
        correctIndex: 1,
      },
      {
        text: { en: 'How many minutes are in an hour?', ru: 'Сколько минут в часе?' },
        options: [
          { en: '30', ru: '30' },
          { en: '45', ru: '45' },
          { en: '60', ru: '60' },
          { en: '100', ru: '100' },
        ],
        correctIndex: 2,
      },
    ],
  },

  // ============================================================
  // 17. MATH — НОВЫЙ
  // ============================================================
  {
    slug: 'math-basics',
    title: { en: 'Math Basics', ru: 'Математика' },
    description: { en: 'Arithmetic, geometry, and basic math concepts.', ru: 'Арифметика, геометрия и базовая математика.' },
    category: { en: 'Science', ru: 'Наука' },
    difficulty: 'easy',
    icon: '🔢',
    color: '#10b981',
    questions: [
      { text: { en: 'What is 7 × 8?', ru: 'Сколько 7 × 8?' }, options: [{ en: '54', ru: '54' }, { en: '56', ru: '56' }, { en: '64', ru: '64' }, { en: '58', ru: '58' }], correctIndex: 1 },
      { text: { en: 'What is the square root of 144?', ru: 'Корень из 144?' }, options: [{ en: '10', ru: '10' }, { en: '11', ru: '11' }, { en: '12', ru: '12' }, { en: '14', ru: '14' }], correctIndex: 2 },
      { text: { en: 'How many degrees in a triangle?', ru: 'Сколько градусов в треугольнике?' }, options: [{ en: '90', ru: '90' }, { en: '180', ru: '180' }, { en: '270', ru: '270' }, { en: '360', ru: '360' }], correctIndex: 1 },
      { text: { en: 'What is 15% of 200?', ru: 'Сколько 15% от 200?' }, options: [{ en: '20', ru: '20' }, { en: '25', ru: '25' }, { en: '30', ru: '30' }, { en: '35', ru: '35' }], correctIndex: 2 },
      { text: { en: 'What is 9² (nine squared)?', ru: 'Сколько 9²?' }, options: [{ en: '72', ru: '72' }, { en: '81', ru: '81' }, { en: '90', ru: '90' }, { en: '99', ru: '99' }], correctIndex: 1 },
      { text: { en: 'How many sides does a hexagon have?', ru: 'Сколько сторон у шестиугольника?' }, options: [{ en: '5', ru: '5' }, { en: '6', ru: '6' }, { en: '7', ru: '7' }, { en: '8', ru: '8' }], correctIndex: 1 },
      { text: { en: 'What is 144 ÷ 12?', ru: 'Сколько 144 ÷ 12?' }, options: [{ en: '10', ru: '10' }, { en: '11', ru: '11' }, { en: '12', ru: '12' }, { en: '14', ru: '14' }], correctIndex: 2 },
      { text: { en: 'What is the next prime after 7?', ru: 'Простое число после 7?' }, options: [{ en: '9', ru: '9' }, { en: '10', ru: '10' }, { en: '11', ru: '11' }, { en: '13', ru: '13' }], correctIndex: 2 },
      { text: { en: 'What is 0.5 as a fraction?', ru: '0.5 в виде дроби?' }, options: [{ en: '1/3', ru: '1/3' }, { en: '1/2', ru: '1/2' }, { en: '2/3', ru: '2/3' }, { en: '3/4', ru: '3/4' }], correctIndex: 1 },
      { text: { en: 'How many minutes in 2.5 hours?', ru: 'Минут в 2.5 часах?' }, options: [{ en: '120', ru: '120' }, { en: '140', ru: '140' }, { en: '150', ru: '150' }, { en: '180', ru: '180' }], correctIndex: 2 },
    ],
  },

  // ============================================================
  // 18. WORLD CAPITALS — НОВЫЙ
  // ============================================================
  {
    slug: 'world-capitals',
    title: { en: 'World Capitals', ru: 'Столицы мира' },
    description: { en: 'Match countries to their capital cities.', ru: 'Подбери столицы к странам.' },
    category: { en: 'Geography', ru: 'География' },
    difficulty: 'medium',
    icon: '🏙️',
    color: '#3b82f6',
    questions: [
      { text: { en: "What is the capital of France?", ru: 'Столица Франции?' }, options: [{ en: 'Lyon', ru: 'Лион' }, { en: 'Paris', ru: 'Париж' }, { en: 'Marseille', ru: 'Марсель' }, { en: 'Nice', ru: 'Ницца' }], correctIndex: 1 },
      { text: { en: 'What is the capital of Japan?', ru: 'Столица Японии?' }, options: [{ en: 'Osaka', ru: 'Осака' }, { en: 'Kyoto', ru: 'Киото' }, { en: 'Tokyo', ru: 'Токио' }, { en: 'Nagoya', ru: 'Нагоя' }], correctIndex: 2 },
      { text: { en: 'What is the capital of Canada?', ru: 'Столица Канады?' }, options: [{ en: 'Toronto', ru: 'Торонто' }, { en: 'Vancouver', ru: 'Ванкувер' }, { en: 'Montreal', ru: 'Монреаль' }, { en: 'Ottawa', ru: 'Оттава' }], correctIndex: 3 },
      { text: { en: 'What is the capital of Egypt?', ru: 'Столица Египта?' }, options: [{ en: 'Cairo', ru: 'Каир' }, { en: 'Alexandria', ru: 'Александрия' }, { en: 'Giza', ru: 'Гиза' }, { en: 'Luxor', ru: 'Луксор' }], correctIndex: 0 },
      { text: { en: 'What is the capital of Brazil?', ru: 'Столица Бразилии?' }, options: [{ en: 'Rio de Janeiro', ru: 'Рио-де-Жанейро' }, { en: 'Brasília', ru: 'Бразилиа' }, { en: 'São Paulo', ru: 'Сан-Паулу' }, { en: 'Salvador', ru: 'Салвадор' }], correctIndex: 1 },
      { text: { en: 'What is the capital of South Korea?', ru: 'Столица Южной Кореи?' }, options: [{ en: 'Busan', ru: 'Пусан' }, { en: 'Incheon', ru: 'Инчхон' }, { en: 'Seoul', ru: 'Сеул' }, { en: 'Daegu', ru: 'Тэгу' }], correctIndex: 2 },
      { text: { en: 'What is the capital of Norway?', ru: 'Столица Норвегии?' }, options: [{ en: 'Bergen', ru: 'Берген' }, { en: 'Oslo', ru: 'Осло' }, { en: 'Trondheim', ru: 'Тронхейм' }, { en: 'Stavanger', ru: 'Ставангер' }], correctIndex: 1 },
      { text: { en: 'What is the capital of Turkey?', ru: 'Столица Турции?' }, options: [{ en: 'Istanbul', ru: 'Стамбул' }, { en: 'Izmir', ru: 'Измир' }, { en: 'Ankara', ru: 'Анкара' }, { en: 'Bursa', ru: 'Бурса' }], correctIndex: 2 },
      { text: { en: 'What is the capital of Argentina?', ru: 'Столица Аргентины?' }, options: [{ en: 'Buenos Aires', ru: 'Буэнос-Айрес' }, { en: 'Córdoba', ru: 'Кордова' }, { en: 'Rosario', ru: 'Росарио' }, { en: 'Mendoza', ru: 'Мендоса' }], correctIndex: 0 },
      { text: { en: 'What is the capital of Thailand?', ru: 'Столица Таиланда?' }, options: [{ en: 'Phuket', ru: 'Пхукет' }, { en: 'Chiang Mai', ru: 'Чианг Май' }, { en: 'Bangkok', ru: 'Бангкок' }, { en: 'Pattaya', ru: 'Паттайя' }], correctIndex: 2 },
    ],
  },

  // ============================================================
  // 19. CHEMISTRY — НОВЫЙ
  // ============================================================
  {
    slug: 'chemistry-basics',
    title: { en: 'Chemistry', ru: 'Химия' },
    description: { en: 'Elements, compounds, and chemical reactions.', ru: 'Элементы, соединения и реакции.' },
    category: { en: 'Science', ru: 'Наука' },
    difficulty: 'hard',
    icon: '⚗️',
    color: '#06b6d4',
    questions: [
      { text: { en: 'What is the chemical symbol for water?', ru: 'Химическая формула воды?' }, options: [{ en: 'CO2', ru: 'CO2' }, { en: 'H2O', ru: 'H2O' }, { en: 'O2', ru: 'O2' }, { en: 'NaCl', ru: 'NaCl' }], correctIndex: 1 },
      { text: { en: 'What is the most abundant element in the universe?', ru: 'Самый распространённый элемент во вселенной?' }, options: [{ en: 'Oxygen', ru: 'Кислород' }, { en: 'Carbon', ru: 'Углерод' }, { en: 'Hydrogen', ru: 'Водород' }, { en: 'Helium', ru: 'Гелий' }], correctIndex: 2 },
      { text: { en: 'What is the atomic number of carbon?', ru: 'Атомный номер углерода?' }, options: [{ en: '4', ru: '4' }, { en: '6', ru: '6' }, { en: '8', ru: '8' }, { en: '12', ru: '12' }], correctIndex: 1 },
      { text: { en: 'What is NaCl commonly known as?', ru: 'NaCl обычно называют?' }, options: [{ en: 'Sugar', ru: 'Сахар' }, { en: 'Salt', ru: 'Соль' }, { en: 'Baking soda', ru: 'Сода' }, { en: 'Vinegar', ru: 'Уксус' }], correctIndex: 1 },
      { text: { en: 'What gas do humans need to breathe?', ru: 'Какой газ нужен людям для дыхания?' }, options: [{ en: 'Nitrogen', ru: 'Азот' }, { en: 'Carbon dioxide', ru: 'Углекислый газ' }, { en: 'Oxygen', ru: 'Кислород' }, { en: 'Hydrogen', ru: 'Водород' }], correctIndex: 2 },
      { text: { en: 'What is the pH of pure water?', ru: 'pH чистой воды?' }, options: [{ en: '0', ru: '0' }, { en: '5', ru: '5' }, { en: '7', ru: '7' }, { en: '14', ru: '14' }], correctIndex: 2 },
      { text: { en: 'What is the lightest element?', ru: 'Самый лёгкий элемент?' }, options: [{ en: 'Helium', ru: 'Гелий' }, { en: 'Hydrogen', ru: 'Водород' }, { en: 'Lithium', ru: 'Литий' }, { en: 'Carbon', ru: 'Углерод' }], correctIndex: 1 },
      { text: { en: 'What is Ozone made of?', ru: 'Из чего состоит озон?' }, options: [{ en: '2 oxygen atoms', ru: '2 атома кислорода' }, { en: '3 oxygen atoms', ru: '3 атома кислорода' }, { en: '1 oxygen + 1 carbon', ru: '1 кислород + 1 углерод' }, { en: '2 nitrogen atoms', ru: '2 атома азота' }], correctIndex: 1 },
      { text: { en: 'What is the chemical symbol for iron?', ru: 'Символ железа?' }, options: [{ en: 'Ir', ru: 'Ir' }, { en: 'Fe', ru: 'Fe' }, { en: 'In', ru: 'In' }, { en: 'Io', ru: 'Io' }], correctIndex: 1 },
      { text: { en: 'What type of bond shares electrons?', ru: 'Какая связь делит электроны?' }, options: [{ en: 'Ionic', ru: 'Ионная' }, { en: 'Covalent', ru: 'Ковалентная' }, { en: 'Metallic', ru: 'Металлическая' }, { en: 'Hydrogen', ru: 'Водородная' }], correctIndex: 1 },
    ],
  },

  // ============================================================
  // 20. FAMOUS PEOPLE — НОВЫЙ
  // ============================================================
  {
    slug: 'famous-people',
    title: { en: 'Famous People', ru: 'Известные люди' },
    description: { en: 'Scientists, leaders, artists, and innovators.', ru: 'Учёные, лидеры, художники, новаторы.' },
    category: { en: 'History', ru: 'История' },
    difficulty: 'medium',
    icon: '👤',
    color: '#a855f7',
    questions: [
      { text: { en: 'Who developed the theory of evolution?', ru: 'Кто создал теорию эволюции?' }, options: [{ en: 'Isaac Newton', ru: 'Ньютон' }, { en: 'Charles Darwin', ru: 'Чарльз Дарвин' }, { en: 'Albert Einstein', ru: 'Эйнштейн' }, { en: 'Gregor Mendel', ru: 'Мендель' }], correctIndex: 1 },
      { text: { en: 'Who painted the ceiling of the Sistine Chapel?', ru: 'Кто расписал потолок Сикстинской капеллы?' }, options: [{ en: 'Leonardo da Vinci', ru: 'Леонардо да Винчи' }, { en: 'Raphael', ru: 'Рафаэль' }, { en: 'Michelangelo', ru: 'Микеланджело' }, { en: 'Donatello', ru: 'Донателло' }], correctIndex: 2 },
      { text: { en: 'Who founded Microsoft?', ru: 'Кто основал Microsoft?' }, options: [{ en: 'Steve Jobs', ru: 'Стив Джобс' }, { en: 'Bill Gates', ru: 'Билл Гейтс' }, { en: 'Mark Zuckerberg', ru: 'Цукерберг' }, { en: 'Larry Page', ru: 'Ларри Пейдж' }], correctIndex: 1 },
      { text: { en: 'Who wrote "The Origin of Species"?', ru: 'Кто написал "Происхождение видов"?' }, options: [{ en: 'Charles Darwin', ru: 'Дарвин' }, { en: 'Karl Marx', ru: 'Маркс' }, { en: 'Sigmund Freud', ru: 'Фрейд' }, { en: 'Albert Einstein', ru: 'Эйнштейн' }], correctIndex: 0 },
      { text: { en: 'Who was the first man in space?', ru: 'Кто первым полетел в космос?' }, options: [{ en: 'Neil Armstrong', ru: 'Армстронг' }, { en: 'Yuri Gagarin', ru: 'Юрий Гагарин' }, { en: 'Buzz Aldrin', ru: 'Олдрин' }, { en: 'John Glenn', ru: 'Гленн' }], correctIndex: 1 },
      { text: { en: 'Who composed "Symphony No. 9"?', ru: 'Кто написал "Симфонию №9"?' }, options: [{ en: 'Mozart', ru: 'Моцарт' }, { en: 'Beethoven', ru: 'Бетховен' }, { en: 'Bach', ru: 'Бах' }, { en: 'Chopin', ru: 'Шопен' }], correctIndex: 1 },
      { text: { en: 'Who is known as the "Father of Computers"?', ru: 'Кого называют "отцом компьютеров"?' }, options: [{ en: 'Alan Turing', ru: 'Алан Тьюринг' }, { en: 'Charles Babbage', ru: 'Чарльз Бэббидж' }, { en: 'Bill Gates', ru: 'Гейтс' }, { en: 'Steve Wozniak', ru: 'Возняк' }], correctIndex: 1 },
      { text: { en: 'Who discovered penicillin?', ru: 'Кто открыл пенициллин?' }, options: [{ en: 'Louis Pasteur', ru: 'Пастер' }, { en: 'Alexander Fleming', ru: 'Александр Флеминг' }, { en: 'Marie Curie', ru: 'Мария Кюри' }, { en: 'Isaac Newton', ru: 'Ньютон' }], correctIndex: 1 },
      { text: { en: 'Who was the leader of the civil rights movement in the US?', ru: 'Кто был лидером движения за гражданские права в США?' }, options: [{ en: 'Malcolm X', ru: 'Малкольм Икс' }, { en: 'Martin Luther King Jr.', ru: 'Мартин Лютер Кинг' }, { en: 'Rosa Parks', ru: 'Роза Паркс' }, { en: 'Nelson Mandela', ru: 'Мандела' }], correctIndex: 1 },
      { text: { en: 'Who invented the telephone?', ru: 'Кто изобрёл телефон?' }, options: [{ en: 'Thomas Edison', ru: 'Эдисон' }, { en: 'Alexander Graham Bell', ru: 'Александр Белл' }, { en: 'Nikola Tesla', ru: 'Тесла' }, { en: 'Guglielmo Marconi', ru: 'Маркони' }], correctIndex: 1 },
    ],
  },

  // ============================================================
  // 21. INVENTIONS — НОВЫЙ
  // ============================================================
  {
    slug: 'inventions',
    title: { en: 'Inventions', ru: 'Изобретения' },
    description: { en: 'Who invented what and when.', ru: 'Кто что изобрёл и когда.' },
    category: { en: 'History', ru: 'История' },
    difficulty: 'medium',
    icon: '💡',
    color: '#eab308',
    questions: [
      { text: { en: 'Who invented the light bulb?', ru: 'Кто изобрёл лампочку?' }, options: [{ en: 'Nikola Tesla', ru: 'Тесла' }, { en: 'Thomas Edison', ru: 'Эдисон' }, { en: 'Benjamin Franklin', ru: 'Франклин' }, { en: 'Alexander Bell', ru: 'Белл' }], correctIndex: 1 },
      { text: { en: 'In which year was the first iPhone released?', ru: 'Когда вышел первый iPhone?' }, options: [{ en: '2005', ru: '2005' }, { en: '2007', ru: '2007' }, { en: '2009', ru: '2009' }, { en: '2011', ru: '2011' }], correctIndex: 1 },
      { text: { en: 'Who invented the World Wide Web?', ru: 'Кто изобрёл WWW?' }, options: [{ en: 'Bill Gates', ru: 'Гейтс' }, { en: 'Steve Jobs', ru: 'Джобс' }, { en: 'Tim Berners-Lee', ru: 'Тим Бернерс-Ли' }, { en: 'Vint Cerf', ru: 'Винт Серф' }], correctIndex: 2 },
      { text: { en: 'Who invented the printing press?', ru: 'Кто изобрёл печатный станок?' }, options: [{ en: 'Leonardo da Vinci', ru: 'Леонардо' }, { en: 'Johannes Gutenberg', ru: 'Гутенберг' }, { en: 'Galileo', ru: 'Галилей' }, { en: 'Isaac Newton', ru: 'Ньютон' }], correctIndex: 1 },
      { text: { en: 'Who invented the airplane?', ru: 'Кто изобрёл самолёт?' }, options: [{ en: 'Wright Brothers', ru: 'Братья Райт' }, { en: 'Amelia Earhart', ru: 'Эрхарт' }, { en: 'Charles Lindbergh', ru: 'Линдберг' }, { en: 'Howard Hughes', ru: 'Хьюз' }], correctIndex: 0 },
      { text: { en: 'Who invented penicillin?', ru: 'Кто открыл пенициллин?' }, options: [{ en: 'Louis Pasteur', ru: 'Пастер' }, { en: 'Alexander Fleming', ru: 'Флеминг' }, { en: 'Marie Curie', ru: 'Кюри' }, { en: 'Isaac Newton', ru: 'Ньютон' }], correctIndex: 1 },
      { text: { en: 'Who invented the telephone?', ru: 'Кто изобрёл телефон?' }, options: [{ en: 'Thomas Edison', ru: 'Эдисон' }, { en: 'Alexander Graham Bell', ru: 'Белл' }, { en: 'Nikola Tesla', ru: 'Тесла' }, { en: 'Guglielmo Marconi', ru: 'Маркони' }], correctIndex: 1 },
      { text: { en: 'Who invented dynamite?', ru: 'Кто изобрёл динамит?' }, options: [{ en: 'Alfred Nobel', ru: 'Альфред Нобель' }, { en: 'Albert Einstein', ru: 'Эйнштейн' }, { en: 'Marie Curie', ru: 'Кюри' }, { en: 'Dmitri Mendeleev', ru: 'Менделеев' }], correctIndex: 0 },
      { text: { en: 'Who invented the radio?', ru: 'Кто изобрёл радио?' }, options: [{ en: 'Thomas Edison', ru: 'Эдисон' }, { en: 'Nikola Tesla', ru: 'Тесла' }, { en: 'Guglielmo Marconi', ru: 'Маркони' }, { en: 'Alexander Bell', ru: 'Белл' }], correctIndex: 2 },
      { text: { en: 'Who invented the steam engine?', ru: 'Кто изобрёл паровой двигатель?' }, options: [{ en: 'James Watt', ru: 'Джеймс Уатт' }, { en: 'Thomas Newcomen', ru: 'Ньюкомен' }, { en: 'George Stephenson', ru: 'Стефенсон' }, { en: 'Henry Ford', ru: 'Форд' }], correctIndex: 0 },
    ],
  },

  // ============================================================
  // 22. CARS — НОВЫЙ
  // ============================================================
  {
    slug: 'cars-trivia',
    title: { en: 'Cars & Vehicles', ru: 'Машины' },
    description: { en: 'Car brands, models, and automotive history.', ru: 'Марки, модели и история авто.' },
    category: { en: 'Technology', ru: 'Технологии' },
    difficulty: 'medium',
    icon: '🚗',
    color: '#ef4444',
    questions: [
      { text: { en: 'Which country is Ferrari from?', ru: 'Из какой страны Ferrari?' }, options: [{ en: 'Germany', ru: 'Германия' }, { en: 'Italy', ru: 'Италия' }, { en: 'France', ru: 'Франция' }, { en: 'USA', ru: 'США' }], correctIndex: 1 },
      { text: { en: 'Who founded Ford Motor Company?', ru: 'Кто основал Ford?' }, options: [{ en: 'Henry Ford', ru: 'Генри Форд' }, { en: 'Edsel Ford', ru: 'Эдсел Форд' }, { en: 'William Durant', ru: 'Дюран' }, { en: 'Walter Chrysler', ru: 'Крайслер' }], correctIndex: 0 },
      { text: { en: 'What does BMW stand for (in German)?', ru: 'Что означает BMW?' }, options: [{ en: 'Bavarian Motor Works', ru: 'Баварские моторы' }, { en: 'British Motor Works', ru: 'Британские моторы' }, { en: 'Best Motor World', ru: 'Лучшие моторы' }, { en: 'Bavarian Machine Works', ru: 'Баварские машины' }], correctIndex: 0 },
      { text: { en: 'Which company makes the "Corolla"?', ru: 'Кто делает "Corolla"?' }, options: [{ en: 'Honda', ru: 'Honda' }, { en: 'Toyota', ru: 'Toyota' }, { en: 'Nissan', ru: 'Nissan' }, { en: 'Mazda', ru: 'Mazda' }], correctIndex: 1 },
      { text: { en: 'What does EV stand for?', ru: 'Что означает EV?' }, options: [{ en: 'Engine Vehicle', ru: 'Engine Vehicle' }, { en: 'Electric Vehicle', ru: 'Electric Vehicle' }, { en: 'Eco Vehicle', ru: 'Eco Vehicle' }, { en: 'Energy Van', ru: 'Energy Van' }], correctIndex: 1 },
      { text: { en: 'Which country is Volvo from?', ru: 'Из какой страны Volvo?' }, options: [{ en: 'Germany', ru: 'Германия' }, { en: 'Sweden', ru: 'Швеция' }, { en: 'Norway', ru: 'Норвегия' }, { en: 'Denmark', ru: 'Дания' }], correctIndex: 1 },
      { text: { en: 'Which company makes the "Mustang"?', ru: 'Кто делает "Mustang"?' }, options: [{ en: 'Chevrolet', ru: 'Chevrolet' }, { en: 'Ford', ru: 'Ford' }, { en: 'Dodge', ru: 'Dodge' }, { en: 'GM', ru: 'GM' }], correctIndex: 1 },
      { text: { en: 'What is the most produced car ever?', ru: 'Самая массовая машина в истории?' }, options: [{ en: 'VW Beetle', ru: 'VW Жук' }, { en: 'Ford Model T', ru: 'Ford T' }, { en: 'Toyota Corolla', ru: 'Toyota Corolla' }, { en: 'Honda Civic', ru: 'Honda Civic' }], correctIndex: 2 },
      { text: { en: 'Which company makes the "911"?', ru: 'Кто делает "911"?' }, options: [{ en: 'Ferrari', ru: 'Ferrari' }, { en: 'Lamborghini', ru: 'Lamborghini' }, { en: 'Porsche', ru: 'Porsche' }, { en: 'Audi', ru: 'Audi' }], correctIndex: 2 },
      { text: { en: 'Who invented the first car?', ru: 'Кто изобрёл первый автомобиль?' }, options: [{ en: 'Henry Ford', ru: 'Форд' }, { en: 'Karl Benz', ru: 'Карл Бенц' }, { en: 'Nicolas-Joseph Cugnot', ru: 'Кюньо' }, { en: 'Gottlieb Daimler', ru: 'Даймлер' }], correctIndex: 1 },
    ],
  },

  // ============================================================
  // 23. INTERNET CULTURE — НОВЫЙ
  // ============================================================
  {
    slug: 'internet-culture',
    title: { en: 'Internet Culture', ru: 'Интернет-культура' },
    description: { en: 'Memes, viral trends, and online phenomena.', ru: 'Мемы, тренды и феномены интернета.' },
    category: { en: 'Technology', ru: 'Технологии' },
    difficulty: 'easy',
    icon: '🌐',
    color: '#22d3ee',
    questions: [
      { text: { en: 'What does "URL" stand for?', ru: 'Что означает URL?' }, options: [{ en: 'Universal Resource Locator', ru: 'Universal Resource Locator' }, { en: 'Uniform Resource Locator', ru: 'Uniform Resource Locator' }, { en: 'United Resource Link', ru: 'United Resource Link' }, { en: 'Universal Reading Link', ru: 'Universal Reading Link' }], correctIndex: 1 },
      { text: { en: 'Which company owns Instagram?', ru: 'Кому принадлежит Instagram?' }, options: [{ en: 'Google', ru: 'Google' }, { en: 'Twitter', ru: 'Twitter' }, { en: 'Meta (Facebook)', ru: 'Meta (Facebook)' }, { en: 'Microsoft', ru: 'Microsoft' }], correctIndex: 2 },
      { text: { en: 'What year was YouTube founded?', ru: 'В каком году основан YouTube?' }, options: [{ en: '2003', ru: '2003' }, { en: '2005', ru: '2005' }, { en: '2007', ru: '2007' }, { en: '2009', ru: '2009' }], correctIndex: 1 },
      { text: { en: 'What does "HTTP" stand for?', ru: 'Что означает HTTP?' }, options: [{ en: 'HyperText Transfer Protocol', ru: 'HyperText Transfer Protocol' }, { en: 'High Tech Transfer Process', ru: 'High Tech Transfer Process' }, { en: 'HyperText Transmission Protocol', ru: 'HyperText Transmission Protocol' }, { en: 'Home Tool Transfer Protocol', ru: 'Home Tool Transfer Protocol' }], correctIndex: 0 },
      { text: { en: 'Which platform is known for short videos and "TikTok dances"?', ru: 'Какая платформа известна короткими видео и танцами?' }, options: [{ en: 'Vine', ru: 'Vine' }, { en: 'TikTok', ru: 'TikTok' }, { en: 'Instagram', ru: 'Instagram' }, { en: 'YouTube', ru: 'YouTube' }], correctIndex: 1 },
      { text: { en: 'What is a "meme"?', ru: 'Что такое "мем"?' }, options: [{ en: 'A type of computer virus', ru: 'Тип вируса' }, { en: 'A viral idea or content', ru: 'Виральная идея или контент' }, { en: 'A programming language', ru: 'Язык программирования' }, { en: 'A type of website', ru: 'Тип сайта' }], correctIndex: 1 },
      { text: { en: 'Who created Linux?', ru: 'Кто создал Linux?' }, options: [{ en: 'Bill Gates', ru: 'Гейтс' }, { en: 'Steve Jobs', ru: 'Джобс' }, { en: 'Linus Torvalds', ru: 'Линус Торвальдс' }, { en: 'Richard Stallman', ru: 'Столлман' }], correctIndex: 2 },
      { text: { en: 'What does "AI" stand for?', ru: 'Что означает AI?' }, options: [{ en: 'Auto Input', ru: 'Auto Input' }, { en: 'Artificial Intelligence', ru: 'Artificial Intelligence' }, { en: 'Advanced Internet', ru: 'Advanced Internet' }, { en: 'Automated Index', ru: 'Automated Index' }], correctIndex: 1 },
      { text: { en: 'What is the most used search engine?', ru: 'Самая популярная поисковая система?' }, options: [{ en: 'Bing', ru: 'Bing' }, { en: 'Yahoo', ru: 'Yahoo' }, { en: 'Google', ru: 'Google' }, { en: 'DuckDuckGo', ru: 'DuckDuckGo' }], correctIndex: 2 },
      { text: { en: 'What does "www" stand for?', ru: 'Что означает www?' }, options: [{ en: 'World Wide Web', ru: 'World Wide Web' }, { en: 'Web World Wide', ru: 'Web World Wide' }, { en: 'Wide World Web', ru: 'Wide World Web' }, { en: 'World Web Wide', ru: 'World Web Wide' }], correctIndex: 0 },
    ],
  },

  // ============================================================
  // 24. WORLD WONDERS — НОВЫЙ
  // ============================================================
  {
    slug: 'world-wonders',
    title: { en: 'World Wonders', ru: 'Чудеса света' },
    description: { en: 'Famous landmarks and natural wonders.', ru: 'Знаменитые достопримечательности и чудеса природы.' },
    category: { en: 'Geography', ru: 'География' },
    difficulty: 'medium',
    icon: '🗿',
    color: '#f97316',
    questions: [
      { text: { en: 'Where is the Eiffel Tower located?', ru: 'Где находится Эйфелева башня?' }, options: [{ en: 'London', ru: 'Лондон' }, { en: 'Rome', ru: 'Рим' }, { en: 'Paris', ru: 'Париж' }, { en: 'Madrid', ru: 'Мадрид' }], correctIndex: 2 },
      { text: { en: 'Where are the Pyramids of Giza?', ru: 'Где пирамиды Гизы?' }, options: [{ en: 'Iraq', ru: 'Ирак' }, { en: 'Egypt', ru: 'Египет' }, { en: 'Mexico', ru: 'Мексика' }, { en: 'Sudan', ru: 'Судан' }], correctIndex: 1 },
      { text: { en: 'Where is the Great Wall visible from?', ru: 'Откуда видна Великая Китайская стена?' }, options: [{ en: 'Space (with naked eye)', ru: 'Из космоса (невооружённым глазом)' }, { en: 'Moon', ru: 'С Луны' }, { en: 'Mount Everest', ru: 'С Эвереста' }, { en: 'Satellite only', ru: 'Только со спутника' }], correctIndex: 0, explanation: { en: 'Visible from low Earth orbit, not from the Moon as myth claims.', ru: 'Видна с низкой околоземной орбиты, но не с Луны, как говорит миф.' } },
      { text: { en: 'Where is Machu Picchu?', ru: 'Где Мачу-Пикчу?' }, options: [{ en: 'Mexico', ru: 'Мексика' }, { en: 'Peru', ru: 'Перу' }, { en: 'Bolivia', ru: 'Боливия' }, { en: 'Chile', ru: 'Чили' }], correctIndex: 1 },
      { text: { en: 'Where is the Taj Mahal?', ru: 'Где Тадж-Махал?' }, options: [{ en: 'Pakistan', ru: 'Пакистан' }, { en: 'India', ru: 'Индия' }, { en: 'Iran', ru: 'Иран' }, { en: 'Bangladesh', ru: 'Бангладеш' }], correctIndex: 1 },
      { text: { en: 'Where is the Colosseum?', ru: 'Где Колизей?' }, options: [{ en: 'Athens', ru: 'Афины' }, { en: 'Rome', ru: 'Рим' }, { en: 'Cairo', ru: 'Каир' }, { en: 'Istanbul', ru: 'Стамбул' }], correctIndex: 1 },
      { text: { en: 'Where is the Statue of Liberty?', ru: 'Где Статуя Свободы?' }, options: [{ en: 'Los Angeles', ru: 'Лос-Анджелес' }, { en: 'Washington DC', ru: 'Вашингтон' }, { en: 'New York', ru: 'Нью-Йорк' }, { en: 'Chicago', ru: 'Чикаго' }], correctIndex: 2 },
      { text: { en: 'Where is the Grand Canyon?', ru: 'Где Гранд-Каньон?' }, options: [{ en: 'Arizona, USA', ru: 'Аризона, США' }, { en: 'Nevada, USA', ru: 'Невада, США' }, { en: 'Utah, USA', ru: 'Юта, США' }, { en: 'Texas, USA', ru: 'Техас, США' }], correctIndex: 0 },
      { text: { en: 'Where are the Northern Lights (Aurora Borealis) most visible?', ru: 'Где лучше всего видно Северное сияние?' }, options: [{ en: 'Near equator', ru: 'У экватора' }, { en: 'Near poles', ru: 'У полюсов' }, { en: 'In deserts', ru: 'В пустынях' }, { en: 'In jungles', ru: 'В джунглях' }], correctIndex: 1 },
      { text: { en: 'Where is the Great Barrier Reef?', ru: 'Где Большой Барьерный риф?' }, options: [{ en: 'Brazil', ru: 'Бразилия' }, { en: 'Australia', ru: 'Австралия' }, { en: 'Indonesia', ru: 'Индонезия' }, { en: 'Philippines', ru: 'Филиппины' }], correctIndex: 1 },
    ],
  },

  // ============================================================
  // 25. ANIMALS — НОВЫЙ (отдельно от Nature)
  // ============================================================
  {
    slug: 'animals-trivia',
    title: { en: 'Animals', ru: 'Животные' },
    description: { en: 'Mammals, birds, reptiles, and marine life.', ru: 'Млекопитающие, птицы, рептилии, морские.' },
    category: { en: 'Nature', ru: 'Природа' },
    difficulty: 'easy',
    icon: '🐾',
    color: '#84cc16',
    questions: [
      { text: { en: 'What is the largest mammal?', ru: 'Самое крупное млекопитающее?' }, options: [{ en: 'Elephant', ru: 'Слон' }, { en: 'Blue Whale', ru: 'Синий кит' }, { en: 'Giraffe', ru: 'Жираф' }, { en: 'Hippo', ru: 'Бегемот' }], correctIndex: 1 },
      { text: { en: 'How many legs does a spider have?', ru: 'Сколько ног у паука?' }, options: [{ en: '6', ru: '6' }, { en: '8', ru: '8' }, { en: '10', ru: '10' }, { en: '12', ru: '12' }], correctIndex: 1 },
      { text: { en: 'Which bird cannot fly?', ru: 'Какая птица не умеет летать?' }, options: [{ en: 'Sparrow', ru: 'Воробей' }, { en: 'Penguin', ru: 'Пингвин' }, { en: 'Eagle', ru: 'Орёл' }, { en: 'Robin', ru: 'Малиновка' }], correctIndex: 1 },
      { text: { en: 'What is the fastest land animal?', ru: 'Самое быстрое наземное животное?' }, options: [{ en: 'Lion', ru: 'Лев' }, { en: 'Cheetah', ru: 'Гепард' }, { en: 'Horse', ru: 'Лошадь' }, { en: 'Antelope', ru: 'Антилопа' }], correctIndex: 1 },
      { text: { en: 'Which animal is known as "man\'s best friend"?', ru: 'Какое животное — "лучший друг человека"?' }, options: [{ en: 'Cat', ru: 'Кошка' }, { en: 'Dog', ru: 'Собака' }, { en: 'Horse', ru: 'Лошадь' }, { en: 'Cow', ru: 'Корова' }], correctIndex: 1 },
      { text: { en: 'How many hearts does an octopus have?', ru: 'Сколько сердец у осьминога?' }, options: [{ en: '1', ru: '1' }, { en: '2', ru: '2' }, { en: '3', ru: '3' }, { en: '4', ru: '4' }], correctIndex: 2 },
      { text: { en: 'Which animal sleeps the most per day?', ru: 'Какое животное спит больше всего?' }, options: [{ en: 'Cat', ru: 'Кошка' }, { en: 'Sloth', ru: 'Ленивец' }, { en: 'Koala', ru: 'Коала' }, { en: 'Lion', ru: 'Лев' }], correctIndex: 1, explanation: { en: 'Sloths sleep up to 20 hours per day.', ru: 'Ленивцы спят до 20 часов в сутки.' } },
      { text: { en: 'What is a baby kangaroo called?', ru: 'Как называется детёныш кенгуру?' }, options: [{ en: 'Cub', ru: 'Куб' }, { en: 'Joey', ru: 'Джоуи' }, { en: 'Kit', ru: 'Кит' }, { en: 'Pup', ru: 'Пап' }], correctIndex: 1 },
      { text: { en: 'Which animal can change color?', ru: 'Какое животное меняет цвет?' }, options: [{ en: 'Frog', ru: 'Лягушка' }, { en: 'Chameleon', ru: 'Хамелеон' }, { en: 'Snake', ru: 'Змея' }, { en: 'Iguana', ru: 'Игуана' }], correctIndex: 1 },
      { text: { en: 'What is the tallest animal?', ru: 'Самое высокое животное?' }, options: [{ en: 'Elephant', ru: 'Слон' }, { en: 'Giraffe', ru: 'Жираф' }, { en: 'Horse', ru: 'Лошадь' }, { en: 'Camel', ru: 'Верблюд' }], correctIndex: 1 },
    ],
  },

  // ============================================================
  // 26. BRAIN TEASERS — НОВЫЙ
  // ============================================================
  {
    slug: 'brain-teasers',
    title: { en: 'Brain Teasers', ru: 'Головоломки' },
    description: { en: 'Logic puzzles and riddles.', ru: 'Логические задачи и загадки.' },
    category: { en: 'Mixed', ru: 'Разное' },
    difficulty: 'hard',
    icon: '🧩',
    color: '#8b5cf6',
    questions: [
      { text: { en: 'I am an odd number. Remove a letter and I become even. What am I?', ru: 'Я нечётное. Убери букву — стану чётным. Что я?' }, options: [{ en: 'Three', ru: 'Три' }, { en: 'Five', ru: 'Пять' }, { en: 'Seven', ru: 'Семь' }, { en: 'Nine', ru: 'Девять' }], correctIndex: 2, explanation: { en: 'Remove "s" from "seven" → "even".', ru: 'Убери "s" из "seven" → "even".' } },
      { text: { en: 'What has keys but can\'t open doors?', ru: 'Что имеет клавиши, но не открывает двери?' }, options: [{ en: 'A map', ru: 'Карта' }, { en: 'A piano', ru: 'Пианино' }, { en: 'A computer', ru: 'Компьютер' }, { en: 'A clock', ru: 'Часы' }], correctIndex: 1 },
      { text: { en: 'What gets wetter as it dries?', ru: 'Что становится мокрее, когда сушит?' }, options: [{ en: 'A towel', ru: 'Полотенце' }, { en: 'A sponge', ru: 'Губка' }, { en: 'A hair dryer', ru: 'Фен' }, { en: 'The sun', ru: 'Солнце' }], correctIndex: 0 },
      { text: { en: 'I have hands but cannot clap. What am I?', ru: 'У меня есть руки, но я не могу хлопать. Что я?' }, options: [{ en: 'A clock', ru: 'Часы' }, { en: 'A statue', ru: 'Статуя' }, { en: 'A tree', ru: 'Дерево' }, { en: 'A doll', ru: 'Кукла' }], correctIndex: 0 },
      { text: { en: 'What goes up but never comes down?', ru: 'Что только растёт и никогда не уменьшается?' }, options: [{ en: 'A balloon', ru: 'Шарик' }, { en: 'Age', ru: 'Возраст' }, { en: 'Temperature', ru: 'Температура' }, { en: 'The sun', ru: 'Солнце' }], correctIndex: 1 },
      { text: { en: 'What has a head and a tail but no body?', ru: 'У чего есть голова и хвост, но нет тела?' }, options: [{ en: 'A snake', ru: 'Змея' }, { en: 'A coin', ru: 'Монета' }, { en: 'A fish', ru: 'Рыба' }, { en: 'A comet', ru: 'Комета' }], correctIndex: 1 },
      { text: { en: 'The more you take, the more you leave behind. What are they?', ru: 'Чем больше берёшь, тем больше оставляешь. Что это?' }, options: [{ en: 'Footsteps', ru: 'Шаги' }, { en: 'Memories', ru: 'Воспоминания' }, { en: 'Photos', ru: 'Фото' }, { en: 'Money', ru: 'Деньги' }], correctIndex: 0 },
      { text: { en: 'What can travel around the world while staying in a corner?', ru: 'Что может объехать мир, оставаясь в углу?' }, options: [{ en: 'Light', ru: 'Свет' }, { en: 'A stamp', ru: 'Марка' }, { en: 'A flag', ru: 'Флаг' }, { en: 'A book', ru: 'Книга' }], correctIndex: 1 },
      { text: { en: 'What has many keys but can\'t open a single lock?', ru: 'У чего много клавиш, но ни один замок не откроет?' }, options: [{ en: 'A piano', ru: 'Пианино' }, { en: 'A keyboard', ru: 'Клавиатура' }, { en: 'A map', ru: 'Карта' }, { en: 'All of the above', ru: 'Все варианты' }], correctIndex: 3 },
      { text: { en: 'I am not alive, but I grow. I don\'t have lungs, but I need air. What am I?', ru: 'Я не живой, но расту. Нет лёгких, но нужен воздух. Что я?' }, options: [{ en: 'A plant', ru: 'Растение' }, { en: 'Fire', ru: 'Огонь' }, { en: 'A cloud', ru: 'Облако' }, { en: 'A virus', ru: 'Вирус' }], correctIndex: 1 },
    ],
  },

  // ============================================================
  // 27. GEOGRAPHY RUSSIA — НОВЫЙ
  // ============================================================
  {
    slug: 'geography-russia',
    title: { en: 'Geography of Russia', ru: 'География России' },
    description: { en: 'Cities, rivers, mountains of Russia.', ru: 'Города, реки, горы России.' },
    category: { en: 'Geography', ru: 'География' },
    difficulty: 'medium',
    icon: '🗺️',
    color: '#dc2626',
    questions: [
      { text: { en: 'What is the longest river in Russia?', ru: 'Самая длинная река России?' }, options: [{ en: 'Volga', ru: 'Волга' }, { en: 'Lena', ru: 'Лена' }, { en: 'Ob', ru: 'Обь' }, { en: 'Yenisei', ru: 'Енисей' }], correctIndex: 1, explanation: { en: 'Lena is 4400 km. Volga is the longest in Europe.', ru: 'Лена — 4400 км. Волга — самая длинная в Европе.' } },
      { text: { en: 'What is the deepest lake in Russia (and the world)?', ru: 'Самое глубокое озеро России и мира?' }, options: [{ en: 'Ladoga', ru: 'Ладога' }, { en: 'Baikal', ru: 'Байкал' }, { en: 'Onega', ru: 'Онега' }, { en: 'Caspian Sea', ru: 'Каспий' }], correctIndex: 1 },
      { text: { en: 'What mountain range divides Europe and Asia?', ru: 'Какой хребет делит Европу и Азию?' }, options: [{ en: 'Caucasus', ru: 'Кавказ' }, { en: 'Urals', ru: 'Урал' }, { en: 'Altai', ru: 'Алтай' }, { en: 'Sayan', ru: 'Саяны' }], correctIndex: 1 },
      { text: { en: 'What is the capital of Russia?', ru: 'Столица России?' }, options: [{ en: 'Saint Petersburg', ru: 'Санкт-Петербург' }, { en: 'Moscow', ru: 'Москва' }, { en: 'Kazan', ru: 'Казань' }, { en: 'Novosibirsk', ru: 'Новосибирск' }], correctIndex: 1 },
      { text: { en: 'Which city was the capital before Moscow?', ru: 'Какой город был столицей до Москвы?' }, options: [{ en: 'Kiev', ru: 'Киев' }, { en: 'Saint Petersburg', ru: 'Санкт-Петербург' }, { en: 'Vladimir', ru: 'Владимир' }, { en: 'Novgorod', ru: 'Новгород' }], correctIndex: 1 },
      { text: { en: 'What is the largest city in Siberia?', ru: 'Самый большой город Сибири?' }, options: [{ en: 'Krasnoyarsk', ru: 'Красноярск' }, { en: 'Irkutsk', ru: 'Иркутск' }, { en: 'Novosibirsk', ru: 'Новосибирск' }, { en: 'Omsk', ru: 'Омск' }], correctIndex: 2 },
      { text: { en: 'Russia spans how many time zones?', ru: 'Сколько часовых поясов в России?' }, options: [{ en: '7', ru: '7' }, { en: '9', ru: '9' }, { en: '11', ru: '11' }, { en: '13', ru: '13' }], correctIndex: 2 },
      { text: { en: 'What is the highest mountain in Russia?', ru: 'Самая высокая гора России?' }, options: [{ en: 'Kazbek', ru: 'Казбек' }, { en: 'Elbrus', ru: 'Эльбрус' }, { en: 'Belukha', ru: 'Белуха' }, { en: 'Narodnaya', ru: 'Народная' }], correctIndex: 1 },
      { text: { en: 'Which sea borders Russia to the east?', ru: 'Какое море на востоке России?' }, options: [{ en: 'Baltic', ru: 'Балтийское' }, { en: 'Black', ru: 'Чёрное' }, { en: 'Bering', ru: 'Берингово' }, { en: 'Caspian', ru: 'Каспийское' }], correctIndex: 2 },
      { text: { en: 'Which city is known as the "Window to Europe"?', ru: 'Какой город называют "окном в Европу"?' }, options: [{ en: 'Moscow', ru: 'Москва' }, { en: 'Saint Petersburg', ru: 'Санкт-Петербург' }, { en: 'Kaliningrad', ru: 'Калининград' }, { en: 'Murmansk', ru: 'Мурманск' }], correctIndex: 1 },
    ],
  },

  // ============================================================
  // 28. HISTORY XX CENTURY — НОВЫЙ
  // ============================================================
  {
    slug: 'history-xx-century',
    title: { en: 'XX Century History', ru: 'XX век' },
    description: { en: 'World Wars, Cold War, and modern history.', ru: 'Мировые войны, холодная война.' },
    category: { en: 'History', ru: 'История' },
    difficulty: 'hard',
    icon: '🕰️',
    color: '#0891b2',
    questions: [
      { text: { en: 'In which year did WWI begin?', ru: 'Когда началась Первая мировая?' }, options: [{ en: '1912', ru: '1912' }, { en: '1914', ru: '1914' }, { en: '1916', ru: '1916' }, { en: '1918', ru: '1918' }], correctIndex: 1 },
      { text: { en: 'Who was the US President during most of WWII?', ru: 'Кто был президентом США во время ВМВ?' }, options: [{ en: 'Truman', ru: 'Трумэн' }, { en: 'Eisenhower', ru: 'Эйзенхауэр' }, { en: 'Roosevelt', ru: 'Рузвельт' }, { en: 'Kennedy', ru: 'Кеннеди' }], correctIndex: 2 },
      { text: { en: 'When did the Berlin Wall fall?', ru: 'Когда пала Берлинская стена?' }, options: [{ en: '1987', ru: '1987' }, { en: '1989', ru: '1989' }, { en: '1991', ru: '1991' }, { en: '1993', ru: '1993' }], correctIndex: 1 },
      { text: { en: 'When did the Soviet Union dissolve?', ru: 'Когда распался СССР?' }, options: [{ en: '1989', ru: '1989' }, { en: '1990', ru: '1990' }, { en: '1991', ru: '1991' }, { en: '1992', ru: '1992' }], correctIndex: 2 },
      { text: { en: 'Who was the first man on the Moon?', ru: 'Кто первым ступил на Луну?' }, options: [{ en: 'Buzz Aldrin', ru: 'Олдрин' }, { en: 'Yuri Gagarin', ru: 'Гагарин' }, { en: 'Neil Armstrong', ru: 'Армстронг' }, { en: 'Michael Collins', ru: 'Коллинз' }], correctIndex: 2 },
      { text: { en: 'What event triggered WWI?', ru: 'Что спровоцировало Первую мировую?' }, options: [{ en: 'Assassination of Archduke Franz Ferdinand', ru: 'Убийство эрцгерцога Фердинанда' }, { en: 'Pearl Harbor attack', ru: 'Атака на Перл-Харбор' }, { en: 'Russian Revolution', ru: 'Русская революция' }, { en: 'Treaty of Versailles', ru: 'Версальский договор' }], correctIndex: 0 },
      { text: { en: 'When was the United Nations founded?', ru: 'Когда основана ООН?' }, options: [{ en: '1943', ru: '1943' }, { en: '1945', ru: '1945' }, { en: '1947', ru: '1947' }, { en: '1949', ru: '1949' }], correctIndex: 1 },
      { text: { en: 'Who led India to independence in 1947?', ru: 'Кто привёл Индию к независимости в 1947?' }, options: [{ en: 'Nehru', ru: 'Неру' }, { en: 'Mahatma Gandhi', ru: 'Ганди' }, { en: 'Patel', ru: 'Патель' }, { en: 'Bose', ru: 'Бос' }], correctIndex: 1 },
      { text: { en: 'What was the Cold War primarily about?', ru: 'Чем была холодная война?' }, options: [{ en: 'USA vs USSR', ru: 'США против СССР' }, { en: 'USA vs China', ru: 'США против Китая' }, { en: 'Germany vs France', ru: 'Германия против Франции' }, { en: 'North vs South Korea', ru: 'Северная против Южной Кореи' }], correctIndex: 0 },
      { text: { en: 'When did the Cuban Missile Crisis happen?', ru: 'Когда был Карибский кризис?' }, options: [{ en: '1960', ru: '1960' }, { en: '1962', ru: '1962' }, { en: '1964', ru: '1964' }, { en: '1966', ru: '1966' }], correctIndex: 1 },
    ],
  },

  // ============================================================
  // 29. ENGLISH WORDS — НОВЫЙ
  // ============================================================
  {
    slug: 'english-words',
    title: { en: 'English Vocabulary', ru: 'Английские слова' },
    description: { en: 'Test your English word knowledge.', ru: 'Проверь знание английских слов.' },
    category: { en: 'Mixed', ru: 'Разное' },
    difficulty: 'easy',
    icon: '📝',
    color: '#16a34a',
    questions: [
      { text: { en: 'What is a synonym for "happy"?', ru: 'Синоним к "happy"?' }, options: [{ en: 'Sad', ru: 'Sad' }, { en: 'Joyful', ru: 'Joyful' }, { en: 'Angry', ru: 'Angry' }, { en: 'Tired', ru: 'Tired' }], correctIndex: 1 },
      { text: { en: 'What does "enormous" mean?', ru: 'Что означает "enormous"?' }, options: [{ en: 'Tiny', ru: 'Крошечный' }, { en: 'Huge', ru: 'Огромный' }, { en: 'Quiet', ru: 'Тихий' }, { en: 'Fast', ru: 'Быстрый' }], correctIndex: 1 },
      { text: { en: 'What is the past tense of "go"?', ru: 'Прошедшее время от "go"?' }, options: [{ en: 'Goed', ru: 'Goed' }, { en: 'Went', ru: 'Went' }, { en: 'Gone', ru: 'Gone' }, { en: 'Going', ru: 'Going' }], correctIndex: 1 },
      { text: { en: 'What is an antonym for "ancient"?', ru: 'Антоним к "ancient"?' }, options: [{ en: 'Old', ru: 'Old' }, { en: 'Modern', ru: 'Modern' }, { en: 'Historic', ru: 'Historic' }, { en: 'Classic', ru: 'Classic' }], correctIndex: 1 },
      { text: { en: 'What does "brave" mean?', ru: 'Что означает "brave"?' }, options: [{ en: 'Scared', ru: 'Напуганный' }, { en: 'Courageous', ru: 'Смелый' }, { en: 'Weak', ru: 'Слабый' }, { en: 'Slow', ru: 'Медленный' }], correctIndex: 1 },
      { text: { en: 'What is the plural of "child"?', ru: 'Множественное от "child"?' }, options: [{ en: 'Childs', ru: 'Childs' }, { en: 'Children', ru: 'Children' }, { en: 'Childes', ru: 'Childes' }, { en: 'Childer', ru: 'Childer' }], correctIndex: 1 },
      { text: { en: 'What does "gorgeous" mean?', ru: 'Что означает "gorgeous"?' }, options: [{ en: 'Ugly', ru: 'Уродливый' }, { en: 'Beautiful', ru: 'Красивый' }, { en: 'Cheap', ru: 'Дешёвый' }, { en: 'Loud', ru: 'Громкий' }], correctIndex: 1 },
      { text: { en: 'What is a synonym for "begin"?', ru: 'Синоним к "begin"?' }, options: [{ en: 'End', ru: 'End' }, { en: 'Start', ru: 'Start' }, { en: 'Stop', ru: 'Stop' }, { en: 'Pause', ru: 'Pause' }], correctIndex: 1 },
      { text: { en: 'What does "rapid" mean?', ru: 'Что означает "rapid"?' }, options: [{ en: 'Slow', ru: 'Медленный' }, { en: 'Fast', ru: 'Быстрый' }, { en: 'Late', ru: 'Поздний' }, { en: 'Quiet', ru: 'Тихий' }], correctIndex: 1 },
      { text: { en: 'What is the opposite of "victory"?', ru: 'Противоположность "victory"?' }, options: [{ en: 'Win', ru: 'Win' }, { en: 'Defeat', ru: 'Defeat' }, { en: 'Success', ru: 'Success' }, { en: 'Triumph', ru: 'Triumph' }], correctIndex: 1 },
    ],
  },

  // ============================================================
  // 30. FLAGS OF THE WORLD — НОВЫЙ
  // ============================================================
  {
    slug: 'flags-world',
    title: { en: 'Flags of the World', ru: 'Флаги мира' },
    description: { en: 'Identify countries by their flag colors and patterns.', ru: 'Узнай страны по цветам и узорам флагов.' },
    category: { en: 'Geography', ru: 'География' },
    difficulty: 'medium',
    icon: '🚩',
    color: '#dc2626',
    questions: [
      { text: { en: 'Which country has a flag with a red maple leaf?', ru: 'У какой страны флаг с красным кленовым листом?' }, options: [{ en: 'USA', ru: 'США' }, { en: 'Canada', ru: 'Канада' }, { en: 'Mexico', ru: 'Мексика' }, { en: 'Brazil', ru: 'Бразилия' }], correctIndex: 1 },
      { text: { en: 'Which country has a flag with a red circle on white?', ru: 'У какой страны флаг с красным кругом на белом?' }, options: [{ en: 'China', ru: 'Китай' }, { en: 'Japan', ru: 'Япония' }, { en: 'Korea', ru: 'Корея' }, { en: 'Vietnam', ru: 'Вьетнам' }], correctIndex: 1 },
      { text: { en: 'Which country has a flag with blue and white stripes and a star?', ru: 'Синие и белые полосы со звездой?' }, options: [{ en: 'Greece', ru: 'Греция' }, { en: 'Israel', ru: 'Израиль' }, { en: 'Argentina', ru: 'Аргентина' }, { en: 'Honduras', ru: 'Гондурас' }], correctIndex: 1 },
      { text: { en: 'Which country has a flag with vertical green, white, red stripes?', ru: 'Вертикальные зелёная, белая, красная полосы?' }, options: [{ en: 'France', ru: 'Франция' }, { en: 'Italy', ru: 'Италия' }, { en: 'Ireland', ru: 'Ирландия' }, { en: 'Belgium', ru: 'Бельгия' }], correctIndex: 1 },
      { text: { en: 'Which country has a flag with a Union Jack in the corner?', ru: 'С Union Jack в углу?' }, options: [{ en: 'USA', ru: 'США' }, { en: 'Australia', ru: 'Австралия' }, { en: 'Canada', ru: 'Канада' }, { en: 'India', ru: 'Индия' }], correctIndex: 1 },
      { text: { en: 'Which country has a flag with yellow stars on red?', ru: 'Жёлтые звёзды на красном?' }, options: [{ en: 'Vietnam', ru: 'Вьетнам' }, { en: 'China', ru: 'Китай' }, { en: 'Turkey', ru: 'Турция' }, { en: 'Morocco', ru: 'Марокко' }], correctIndex: 1 },
      { text: { en: 'Which country has a flag with black, red, and gold horizontal stripes?', ru: 'Чёрные, красные, золотые горизонтальные полосы?' }, options: [{ en: 'Belgium', ru: 'Бельгия' }, { en: 'Germany', ru: 'Германия' }, { en: 'Spain', ru: 'Испания' }, { en: 'Netherlands', ru: 'Нидерланды' }], correctIndex: 1 },
      { text: { en: 'Which country has a flag with a white crescent and star on green?', ru: 'Белый полумесяц и звезда на зелёном?' }, options: [{ en: 'Turkey', ru: 'Турция' }, { en: 'Pakistan', ru: 'Пакистан' }, { en: 'Algeria', ru: 'Алжир' }, { en: 'Malaysia', ru: 'Малайзия' }], correctIndex: 1 },
      { text: { en: 'Which country has a flag with a blue cross on white?', ru: 'Синий крест на белом?' }, options: [{ en: 'Sweden', ru: 'Швеция' }, { en: 'Finland', ru: 'Финляндия' }, { en: 'Norway', ru: 'Норвегия' }, { en: 'Denmark', ru: 'Дания' }], correctIndex: 1 },
      { text: { en: 'Which country has a flag with a yellow diamond on green?', ru: 'Жёлтый ромб на зелёном?' }, options: [{ en: 'Brazil', ru: 'Бразилия' }, { en: 'Argentina', ru: 'Аргентина' }, { en: 'Peru', ru: 'Перу' }, { en: 'Colombia', ru: 'Колумбия' }], correctIndex: 0 },
    ],
  },
];

// Helper to get localized text
export function getLocalized(field: LocalizedText | undefined, lang: Lang): string {
  if (!field) return '';
  return field[lang] || field.en;
}

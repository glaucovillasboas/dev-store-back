--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: addresses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.addresses (
    id integer NOT NULL,
    user_id integer NOT NULL,
    address character varying(255) NOT NULL,
    cep character varying(255) NOT NULL,
    complement character varying(255),
    state_id integer NOT NULL
);


ALTER TABLE public.addresses OWNER TO postgres;

--
-- Name: addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.addresses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.addresses_id_seq OWNER TO postgres;

--
-- Name: addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.addresses_id_seq OWNED BY public.addresses.id;


--
-- Name: aspects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.aspects (
    id integer NOT NULL,
    product_id integer NOT NULL,
    name character varying(255) NOT NULL,
    value character varying(255) NOT NULL
);


ALTER TABLE public.aspects OWNER TO postgres;

--
-- Name: aspects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.aspects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.aspects_id_seq OWNER TO postgres;

--
-- Name: aspects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.aspects_id_seq OWNED BY public.aspects.id;


--
-- Name: carts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carts (
    id integer NOT NULL,
    "createdAt" date DEFAULT '2021-11-11'::date NOT NULL,
    "finishedAt" date,
    user_id integer NOT NULL
);


ALTER TABLE public.carts OWNER TO postgres;

--
-- Name: carts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.carts_id_seq OWNER TO postgres;

--
-- Name: carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;


--
-- Name: carts_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carts_products (
    id integer NOT NULL,
    user_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    cart_id integer NOT NULL
);


ALTER TABLE public.carts_products OWNER TO postgres;

--
-- Name: carts_products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carts_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.carts_products_id_seq OWNER TO postgres;

--
-- Name: carts_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carts_products_id_seq OWNED BY public.carts_products.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer NOT NULL,
    cart_id integer NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: orders_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_user_id_seq OWNER TO postgres;

--
-- Name: orders_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_user_id_seq OWNED BY public.orders.user_id;


--
-- Name: phones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.phones (
    id integer NOT NULL,
    user_id integer NOT NULL,
    phone character varying(20) NOT NULL
);


ALTER TABLE public.phones OWNER TO postgres;

--
-- Name: phones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.phones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.phones_id_seq OWNER TO postgres;

--
-- Name: phones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.phones_id_seq OWNED BY public.phones.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    price numeric NOT NULL,
    quantity integer DEFAULT 0 NOT NULL,
    photo text NOT NULL,
    category_id integer NOT NULL,
    code character varying(255) DEFAULT floor(((random() * ('8000000000'::bigint)::double precision) + (1000000000)::double precision)) NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token text NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: states; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.states (
    id integer NOT NULL,
    acronym character varying(2) NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.states OWNER TO postgres;

--
-- Name: states_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.states_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.states_id_seq OWNER TO postgres;

--
-- Name: states_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.states_id_seq OWNED BY public.states.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    cpf character varying(14) NOT NULL,
    photo text,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: addresses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses ALTER COLUMN id SET DEFAULT nextval('public.addresses_id_seq'::regclass);


--
-- Name: aspects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aspects ALTER COLUMN id SET DEFAULT nextval('public.aspects_id_seq'::regclass);


--
-- Name: carts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);


--
-- Name: carts_products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts_products ALTER COLUMN id SET DEFAULT nextval('public.carts_products_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: orders user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN user_id SET DEFAULT nextval('public.orders_user_id_seq'::regclass);


--
-- Name: phones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phones ALTER COLUMN id SET DEFAULT nextval('public.phones_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: states id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.states ALTER COLUMN id SET DEFAULT nextval('public.states_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.addresses (id, user_id, address, cep, complement, state_id) FROM stdin;
\.


--
-- Data for Name: aspects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.aspects (id, product_id, name, value) FROM stdin;
1	1	Aparelhos compatíveis	Desktops e notebooks
2	1	Alimentação	USB
3	1	Wireless	Não
4	1	Wireless	Não
5	1	Peso (kg)	0.157
6	2	Frequência Wireless	2.4 GHz
7	2	Dimensões	\n100.4 x 58.2 x 38.3 mm (3.95 x 2.29 x 1.5 in)
8	2	Peso (kg)	0.078
9	3	Garantia do Fornecedor	12 meses
10	3	Dimensões	13,13 x 5,51 x 1,42
11	3	Peso (kg)	0.2
12	4	Garantia do Fornecedor	12 meses
13	4	Dimensões	3,4x16,6x48cm
14	4	Peso (kg)	0.82
15	5	Garantia do Fornecedor	12 meses
16	5	Dimensões	3,4x16,6x48cm
17	5	Peso (kg)	0.9
18	6	Garantia do Fornecedor	12 meses
19	6	Dimensões	3,6 x 13,2 x 44,5
20	6	Peso (kg)	0.85
21	7	Tamanho da tela	29"
22	7	Resolução	2560x1080
23	7	Peso (kg)	5.2
24	8	Tamanho da tela	19"
25	8	Resolução	1440 x 900 
26	8	Peso (kg)	3.9
27	9	Tamanho da tela	29"
28	9	Resolução	2560x1080
29	9	Peso (kg)	6.2
30	10	Processador	R5
31	10	Memória RAM	12GB
32	10	Peso (kg)	1.7
33	11	Processador	Intel Core i7
34	11	Memória RAM	16 GB
35	11	Peso (kg)	2.3
36	12	Processador	Intel® Pentium® Gold 7505
37	12	Memória RAM	4GB
38	12	Peso (kg)	3.1
39	13	Aparelhos compatíveis	Compatível com Smartphones Android 5.0 ou superior e memória RAM de 1.5GB ou superior.
40	13	Garantia do Fornecedor	12 meses
41	13	Peso (kg)	0.1
42	14	Aparelhos compatíveis	Compatível com Smartphones Android 5.0 ou superior e memória RAM de 1.5GB ou superior.
43	14	Garantia do Fornecedor	12 meses
44	14	Peso (kg)	0.18
45	15	Aparelhos compatíveis	Compatível com Smartphones Android 5.0 ou superior e memória RAM de 1.5GB ou superior.
46	15	Garantia do Fornecedor	12 meses
47	15	Peso (kg)	0.15
48	16	Processador	CORE I3 1ª GERAÇÃO
49	16	Memória	4 GB
50	16	Peso (kg)	4.2
51	17	Processador	Intel Celeron
52	17	Memória	4 GB
53	17	Peso (kg)	3.9
54	18	Processador	Intel Core i5
55	18	Memória	8 GB
56	18	Peso (kg)	3.8
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carts (id, "createdAt", "finishedAt", user_id) FROM stdin;
\.


--
-- Data for Name: carts_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carts_products (id, user_id, product_id, quantity, cart_id) FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name) FROM stdin;
1	Mouses
2	Teclados
3	Monitores
4	Notebook
5	Fones de ouvido
6	Desktops
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, user_id, cart_id) FROM stdin;
\.


--
-- Data for Name: phones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.phones (id, user_id, phone) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, description, price, quantity, photo, category_id, code) FROM stdin;
1	Mouse Gamer Logitech G203	Aproveite ao máximo o seu tempo de jogo com o mouse G203, que possui tecnologia LIGHTSYNC, sensor de nível de jogo e um design clássico de 6 botões. Ilumine seu jogo e sua mesa. Coloque todo o seu potencial em jogo e tenha mais precisão que os adversários.	90.90	60	https://images-submarino.b2w.io/produtos/01/00/img/1720328/9/1720328928_1GG.jpg	1	2383669290
2	Microsoft Mouse Rjn00053 Bluetooth Black	Conheça o seu mouse que é referência para rolagem e navegação em documentos e sites. O design confortável e compacto apresenta uma seleção de cores que complementam seu estilo e têm até 12 horas de bateria.1 Conecta-se via Bluetooth 5.0 LE	119.99	90	https://images-submarino.b2w.io/produtos/01/00/img/3550223/4/3550223444_1GG.jpg	1	2041845941
3	Microsoft Mouse Elg00011 Bluetooth Arc Hdwr Preto	O Microsoft Arc Mouse permite rolar vertical e horizontalmente para uma navegação mais intuitiva. Além disso, desfrute do rastreamento preciso,com um clique esquerdo e direito otimizado.	500.90	66	https://images-submarino.b2w.io/produtos/01/00/img/3574786/9/3574786971_1GG.jpg	1	4794352324
4	Teclado Gamer K55 Rgb Abnt2 - Ch-9206015-Br - Corsair	Luz de fundo RGB de três zonas: Personalize as suas cores com modos de iluminação dinâmica e estática.	199.99	120	https://images-submarino.b2w.io/produtos/01/00/img/134599/5/134599590_1GG.jpg	2	3164096426
5	Teclado Premiun Touch	Teclado ideal para digitar e navegar sem esforço! Formato slim, ideal para Smart TVs, tablets e outros dispositivos Bluetooth (compatíveis com teclados externos). Conexão Bluetooth, padrão ABNT2 e touchpad com funções numéricas	205.00	80	https://images-submarino.b2w.io/produtos/01/00/img/3823612/0/3823612016_1GG.jpg	2	6538649639
6	Teclado Mecânico Gamer Rgb Logitech G512 Carbon Abnt2 Tecnologia Lightsync Usb Passthrough E Switch Exclusivo Gx Brown	O G512 é um teclado para jogos de alto desempenho, com a opção de switches mecânicos GX avançados. A inovadora tecnologia de jogos e a fabricação em liga de alumínio tornam o G512 simples, durável, completo e, além disso, vem na configuração ABNT2.	619.25	200	https://images-submarino.b2w.io/produtos/01/00/img/1698731/6/1698731672_1GG.jpg	2	2491219227
7	Monitor Led 29" Lg Ultrawide 21:9 Com Hdr 10 Ips Full Hd - 29wk600	Tenha tudo em uma tela	1438.99	200	https://images-submarino.b2w.io/produtos/01/00/img7/01/00/item/133777/3/133777366_1GG.png	3	6585433590
8	Monitor Prizi Slim 19 Widescreen Led Hd Preto Hdmi E Vga - Pz0019hdmi	Descrição:Desfrute de todas as qualidades que o monitor Prizi PZ1900HDMI tem para lhe oferecer. Um monitor adaptado a você, com à sua tela led, desfrute de gráficos com cores vivas e atraentes. Uma experiência visual de qualidade qu...	599.20	250	https://images-submarino.b2w.io/produtos/2448888079/imagens/monitor-prizi-slim-19-widescreen-led-hd-preto-hdmi-e-vga-pz0019hdmi/2448888079_1_large.jpg	3	3851634604
10	Notebook Lenovo Ultrafino Ideapad S145 Amd Ryzen 5 12gb 1tb Linux 15.6" Prata	O Notebook Lenovo Ultrafino Ideapad possui uma tela de 15.6 polegadas, ideal para todas as suas atividades diárias e também para seu horário de lazer. Possui um design fino e elegante, pronto para ser levado onde você precisar. Com...	3099.99	250	https://images-submarino.b2w.io/produtos/01/00/img/3383642/6/3383642675_1GG.jpg	4	5380042126
11	Notebook Lenovo Gamer Legion 5i I7-10750h 16gb 512gb Ssd Rtx2060 6gb W10 15.6 Full Hd 82cf0002br\n	Prepare-se para se surpreender com essa máquina que não é brincadeira. Com processador da 10ª Geração Intel® Core™ i7, placa gráfica dedicada NVIDIA® GeForce® RTX 2060 de 6GB, sistema operacional Windows 10 e memória RAM de até 16GB, o Lenovo Legion 5i foi especialmente desenvolvido para atender as altas exigências de gamers profissionais e de usuários que precisam\nde um excelente desempenho.	8315.12	250	https://images-submarino.b2w.io/produtos/3628121650/imagens/notebook-lenovo-gamer-legion-5i-i7-10750h-16gb-512gb-ssd-rtx2060-6gb-w10-15-6-full-hd-82cf0002br/3628121650_1_large.jpg	4	1556762546
12	Notebook Dell Inspiron I15-3501-A10p Intel Pentium Gold-7505 4gb 128gb W10 Hd 15.6" Preto	A tela de 15,6”, antirreflexo de alta definição com dois lados de bordas finas, oferece uma imagem clara e brilhante que é agradável aos olhos	2647.52	250	https://images-submarino.b2w.io/produtos/01/00/img/3251385/6/3251385620_1GG.jpg	4	2944220299
13	Fone De Ouvido Samsung Galaxy Buds Live Bluetooth - Preto	Imitando as curvas da orelha e do rosto para proporcionar um visual natural, os fones têm acabamento polido e vêm em uma caixa inspirada em porta-joias, ideal para caber na sua mão, e em qualquer lugar.	449.00	250	https://images-submarino.b2w.io/produtos/01/00/img/2469541/5/2469541568_1GG.jpg	5	8287384958
14	Fone De Ouvido Philco Pfo01btp Bluetooth Com Até 10 Horas De Bateria - Preto	Uma boa música emociona, traz alegria e deixa nossos dias mais coloridos não é mesmo? Já que a música conta a história das pessoas, nada melhor do que desfrutar dessa arte com um bom fone de ouvido! Por isso vale a pena conferir o F...	139.99	250	https://images-submarino.b2w.io/produtos/01/00/img/1432382/0/1432382065_1GG.jpg	5	3151479933
15	Fone De Ouvido Bluetooth Jbl Tune 500bt Preto	Descrição jbl tune 500BT Os Fones jbl TUNE500BT permitem-lhe transmitir um som potente e com exelente qualidade durante 16 horas de puro prazer. Fácil de usar e equipado com drivers jbl de 32 mm e som jbl Pure Bass, esses fones de o...	246.05	250	https://images-submarino.b2w.io/produtos/51486515/imagens/fone-de-ouvido-bluetooth-jbl-tune-500bt-preto/51486515_1_large.jpg	5	7408356991
16	Cpu Desktop Computador Pc I3 4gb Ram Hd 1tb Windows 10 Pró Oem - Teclado Mouse\n	GARANTIA DE 12 MESES, COM A NOSSA LOJA PROCESSADOR – CORE I3 1ª GERAÇÃO MEMÓRIA – 4GB RAM DDR3 1333MHZ ARMAZENAMENTO – HD 1TBSISTEMA OPERACIONAL – WINDOWS 10 PRÓ ORIGINAL PLACA MÃE - H55 (i3 / i5 / i7 - 1ª GERAÇÃO)LGA - 1156 REDE 	1664.70	250	https://images-submarino.b2w.io/produtos/01/00/img/2950079/9/2950079955_1GG.jpg	6	5769058138
17	Desktop All In One Union C4500a-21 Intel Celeron 4gb 500gb Full Hd 21.5¿ W10 - Positivo	Desktop all in one	2289.00	250	https://images-submarino.b2w.io/produtos/01/00/img/134378/8/134378834_1GG.jpg	6	5678096044
18	Pc Computador Cpu Intel Core I5 + Ssd 240gb, 8gb Memória Ram	Excelente computador para uso doméstico Estudo ou empresarial, com gabinete tipo mini que cabe em qualquer espaço e com design moderno e muito bonito. Tecnologia com baixíssimo consumo de energia. - Windows 10 Pro especificaões técn...	1376.30	250	https://images-submarino.b2w.io/produtos/2679144392/imagens/pc-computador-cpu-intel-core-i5-ssd-240gb-8gb-memoria-ram/2679144392_1_large.jpg	6	2151747392
9	Monitor Gamer Led 29' Ips 1ms Ultrawide Full Hd 29um69g - Lg.	Não brinca em jogo e sabe como é importante ter uma tela de qualidade, permitindo amplo ângulo de visão e tempo e resposta em real time. Para ser um Ultra Gamer, tem que ser Ultra Wide LG.	1699.99	249	https://images-submarino.b2w.io/produtos/01/00/img/132609/4/132609483_1GG.jpg	3	6198428031
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, user_id, token) FROM stdin;
\.


--
-- Data for Name: states; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.states (id, acronym, name) FROM stdin;
1	AC	Acre
2	AL	Alagoas
3	AM	Amazonas
4	AP	Amapá
5	BA	Bahia
6	CE	Ceará
7	DF	Distrito Federal
8	ES	Espírito Santo
9	GO	Goiás
10	MA	Maranhão
11	MG	Minas Gerais
12	MS	Mato Grosso do Sul
13	MT	Mato Grosso
14	PA	Pará
15	PB	Paraíba
16	PE	Pernambuco
17	PI	Piauí
18	PR	Paraná
19	RJ	Rio de Janeiro
20	RN	Rio Grande do Norte
21	RO	Rondônia
22	RR	Roraima
23	RS	Rio Grande do Sul
24	SC	Santa Catarina
25	SE	Sergipe
26	SP	São Paulo
27	TO	Tocantins
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, cpf, photo, password) FROM stdin;
\.


--
-- Name: addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.addresses_id_seq', 4, true);


--
-- Name: aspects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.aspects_id_seq', 56, true);


--
-- Name: carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carts_id_seq', 2, true);


--
-- Name: carts_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carts_products_id_seq', 8, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 6, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- Name: orders_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_user_id_seq', 1, false);


--
-- Name: phones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.phones_id_seq', 4, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 18, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 4, true);


--
-- Name: states_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.states_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- PostgreSQL database dump complete
--
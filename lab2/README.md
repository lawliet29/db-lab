# Хранилища "ключ-значение" на примере Redis. Широко-столбцовые хранилища на примере Apache Cassandra.

## Установка Docker

Для локального развёртывания Redis, Cassandra и баз данных в других лабораторных будем использовать Docker. Подробные инструкции по установке можно [найти тут](https://docs.docker.com/install/).

Чтобы проверить корректность установки, выполните в консоли команду:

```bash
> docker run hello-world
```

После скачивания образа в терминале должно отобразиться сообщение "Hello from Docker!
This message shows that your installation appears to be working correctly."


## 1. Работа с Reids

Для локального запуска Redis в docker-контейнере можно использовать следующую команду:

```bash
> docker run -p 6379:6379 redis
```

Порт 6379 используется для клиентских подключений.

Для работы с сервером Redis используется библиотека `node-redis` и обёртка `handy-redis` для предоставления типизации и асинхронного API на базе Promise, что позволяет для таких операций использовать синтаксис async/await.

Redis-клиенты могут отправить серверу любые команды, для чего используются функции, названия и сигнатуры которых совпадают с командами, которые может интерпретировать Redis-сервер. Полный список команд, их описание и асимптотическую сложность можно найти в [официальной документации](https://redis.io/commands).

### Задание по первой части лабораторной работы

1. Изучить исходный код файла `redis.ts`.
2. При помощи предоставленного клиента продемонстрировать работу с различными типами данных:
    - строки
    - связные списки
    - множества
    - сортированные множества
    - хэши
    - [HyperLogLog](https://thoughtbot.com/blog/hyperloglogs-in-redis)

## 2. Работа с Apache Cassandra

Для локального запуска Apache Cassandra в docker-контейнере можно использовать следующую команду:

```bash
> docker run -p 9042:9042 cassandra:latest
```

Порт 9042 используется сервером Cassandra для взаимодействия с клиентскими приложениями с использованием языка запросов CQL.

По умолчанию сервером будет отнесён к центру с идентификатором `datacenter1`, а для работы будет создан пользователь по умолчанию `cassandra` с паролем `cassandra`.

Проектирование модели данных в Apache Cassandra существенно отличается от проектирования данных по реляционной модели. При проектировании модели данных следует руководствоваться следующими принципами:

#### 1. Количество обращений в базу на запись *не должно* быть минимально возможным.

Реляционная схема подразумевает нормализацию данных, основная цель которой - сделать любую операцию модификации одного факта об одной сущности атомарной. В Cassandra же приоритет отдаётся операциям чтения - практически всегда целесообразнее спроектировать модель так, чтобы наиболее эффективно получать данные при выборке, в ущерб атомарности каких-либо операций записи. Это целесообразно в тех случаях, когда более сложные операции выборки происходят намного чаще, чем операции модификации.

#### 2. Данные могут дублироваться.

Cassandra не накладывает требований на отсутствие дублирования данных и не поддерживает операции объединения пространств колонок (таблиц). В этой связи сами данные в таблицах и репликах должны содержать весь набор информации, который необходим для удовлетворения этого запроса, поэтому в Cassandra допускается денормализация - дублирование этой информации между различными таблицами.

#### 3. Корректно выбирайте стратегию построения разделов данных.

Первая часть первичного ключа - ключ раздела - в Cassandra автоматически задаёт стратегию шардинга  данных. Отдельные разделы могут храниться на различных узлах. В этой связи ключ должен выбираться таким образом, чтобы данные были равномерно распределены между разделами.

С другой стороны, наиболее эффективными будут запросы на чтение, которые обращаются к как можно меньшему числу разделов, поскольку данные могут физически находиться на разных узлах. Кроме того, метод обращения к данным даже в пределах одного узла оптимизирован под чтение только из одного раздела.

#### 4. Модель данных должна соответствовать не логической или доменной схеме данных, а тем запросам, которые будут выполняться над этими данными.

Нормализованная схема в реляционных СУБД поддерживает произвольные запросы любой сложности, но для их реализации может потребоваться большое количество затратных операций, например, группировка или объединение таблиц.

В Cassandra предпочтение отдаётся такой схеме, которая удовлетворяет конкретному запросу прикладного приложения. Если возможны разнородные запросы за одними и теми же данными, предпочтительным вариантом является создание отдельной таблицы с дублирующимися данными для каждого из этих запросов.

При этом, для удовлетворения предыдущего принципа, следует стараться строить таблицы под запросы таким образом, чтобы чтение всего набора данных могло проводиться из одного и того же раздела. Как правило, для этого поля, по которым осуществляется фильтрация, для соответствующих таблиц целесообразно сделать ключом раздела.

### Задание по 2 части лабораторной работы:

- Изучить исходный код в файле `cassandra.ts`.
- Запустить сервер Apache Cassandra в docker-контейнере, как описано ранее.
- Спроектировать денормализованную схему для работы с пользователями по адресу электронной почты и логину, в соответствии с представленной нормализованной схемой.


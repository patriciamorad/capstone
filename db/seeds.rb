# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create({name: "User One", email: "user1@email.com", password: "password"})
user = User.create({name: "User Two", email: "user2@email.com", password: "password"})
user = User.create({name: "User Three", email: "user3@email.com", password: "password"})

attendedevent = AttendedEvent.create({api_event_id: 1, name: "Coffee with a Coder", date: DateTime.new(2017, 12, 28), location: "123 N. Street", event_image: "https://blogs.transparent.com/polish/files/2017/09/pp-hot-coffee-rf-istock.jpg", user_id: 2})
attendedevent = AttendedEvent.create({api_event_id: 2, name: "Happy Hour", date: DateTime.new(2018,05,01), location: "123 N. Street", event_image: "http://beerlawcenter.com/wp-content/uploads/2017/08/Happy_Hour_400x800_Webtile.jpg", user_id: 1})


image = Image.create({attended_event_id: 2, user_id: 1, image_url: "https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2015/03/27/102542035-200278039-001.1910x1000.jpg"})
image = Image.create({attended_event_id: 1, user_id: 2, image_url: "http://static1.businessinsider.com/image/58074b31c52402ce248b5254-1190-625/this-brooklyn-coffee-shop-charges-by-the-minute-rather-than-by-the-cup.jpg"})
image = Image.create({attended_event_id: 2, user_id: 1, image_url: "https://www.google.com/search?q=happy+hour&rlz=1C5CHFA_enUS756US756&source=lnms&tbm=isch&sa=X&ved=0ahUKEwizkvKX95HYAhVi5YMKHVeKB2UQ_AUICygC&biw=1173&bih=694#imgrc=Ljty2XGMdHBYHM:"})

eventtidbit = EventTidbit.create({attended_event_id: 1, user_id: 2, tidbit: "The CTOs name is Bob Ross"})
eventtidbit = EventTidbit.create({attended_event_id: 1, user_id: 2, tidbit: "The company just partnered with Google in October for latest campaign"})

acquaintance = Acquaintance.create({attended_event_id: 1, user_id: 2, name: "Dr.Who", job_title: "doctor", notes: "Very weird."})

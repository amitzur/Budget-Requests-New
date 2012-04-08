# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


Scan.delete_all
Dir.foreach("public/docs/pdf") {
  |x|
  unless (x.include? 'Otzar') || x == "." || x == '..'
    s = Scan.new(:filename => x)
    s.save
  end
}
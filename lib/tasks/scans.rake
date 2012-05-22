desc "Remove unnecessary scans"
task :scan_cleanup => :environment do
  puts "Cleaning up Scans..."
  scans = Scan.all
  scans = scans.select { |s| s.filename.include?('k') }
  puts "Deleting scans: #{scans.collect { |s| { :id => s[:id], :filename => s[:filename] } }}"
  bakashas = Bakasha.where(:scan_id => scans.collect { |x| x[:id] })
  puts "Bakashas referenced: #{bakashas.collect {|b| b[:id]}}"
  bakashas.each do |b|
    puts "deleting bakasha #{b[:id]}"
    b.pniyas.each do |p|
      puts "deleting pniya #{p[:id]}"
      p.haavaras.each { |h| h.delete }
      p.delete
    end
    b.delete
  end
  scans.each { |s| s.delete }
  puts "Finished."
end
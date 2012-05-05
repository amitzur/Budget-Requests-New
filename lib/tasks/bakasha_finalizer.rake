desc "Find identical Bakashas and create FinalBakasha"
task :finalize => :environment do
  puts "Finalizing Bakashas..."
  log = { :skipped => [], :processed => {}}
  scans = Scan.all
  scans.each do |s|
    if s.bakashas_count < 2
      log[:skipped] << s.id
      next
    end

    found = false
    log_scan = log[:processed][s[:id]] = { :blank_bakashas => [], :equal => [], :mismatch => [] }
    log_scan[:total_bakashas] = s.bakashas
    for i in 0..s.bakashas_count-1 do
        if s.bakashas[i].pniyas.length == 0
            log_scan[:blank_bakashas] << s.bakashas[i]
            next
        end
        next if i == s.bakashas_count-1
        for j in i+1..s.bakashas_count-1
            if s.bakashas[i] == s.bakashas[j]
                if not found
                  log_scan[:equal] << s.bakashas[i]
                  # insert all bakashas before "i" to the mismatch array
                  (i).times { |x| log_scan[:mismatch] <<  s.bakashas[x] }
                  found = true
                end
                log_scan[:equal] << s.bakashas[j]
            elsif found
                log_scan[:mismatch] << s.bakashas[j]
            end
        end

        break if found
    end

    final_bakasha = FinalBakasha.first(:conditions => { :scans => { :id => s[:id] } }, :joins => :scan, :readonly => false )
    puts "Scan: #{s.id}, found: #{found}, final_bakasha: #{final_bakasha and final_bakasha.id or nil}, readonly: #{final_bakasha and final_bakasha.readonly?}"
    if found
      if final_bakasha.nil?
        final_bakasha = FinalBakasha.create!(:scan => s)
        log_scan[:final_bakasha_action] = "created"
      else
        log_scan[:final_bakasha_action] = "modified"
      end
      final_bakasha.bakashas = log_scan[:equal]
      final_bakasha.save!
    else
      if final_bakasha.nil?
        log_scan[:final_bakasha_action] = "untouched"
      else
        log_scan[:final_bakasha_action] = "deleted"
        final_bakasha.delete
      end

    end
  end

  write_log(log)
end




def write_log(log)
  puts "Skipped Scans: #{log[:skipped].collect { |s| "s#{s}"}}"
  puts "Scans processed: #{log[:processed].keys.collect {|x| "s#{x}"}}"
  for sid, data in log[:processed]
    puts "  Data for s#{sid}: "
    puts "    Total Bakashas: #{data[:total_bakashas].collect { |x| x[:id] }}"
    puts "    Blank Bakashas: #{data[:blank_bakashas].collect { |x| x[:id] }}"
    puts "    Equals: #{data[:equal].collect { |x| x[:id] }}"
    puts "    Mismatch: #{data[:mismatch].collect { |x| x[:id] }}"
    puts "    Final Bakasha: #{data[:final_bakasha_action]}"
  end
end
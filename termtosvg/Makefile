TARGETS = secretscanner.svg yarahunter.svg packetstreamer.svg flowmeter.svg

all: check $(TARGETS)

check:
	[ -x `which termtosvg` ] || echo "No termtosvg"

clean:
	-@rm $(TARGETS)
	-@rm tmp/*

%.svg : %.script tmp/%-template.svg
	./txt2cast.pl < `echo $@ | sed s/svg/script/` > tmp/out.cst
	termtosvg render -D 8000 tmp/out.cst out/$@ -t `echo $@ | sed "s/\(.*\).svg/tmp\/\1-template.svg/"`

tmp/secretscanner-template.svg: template.svg
	sed -e "s/PRODUCTNAME/SecretScanner/" $< > $@

tmp/yarahunter-template.svg: template.svg
	sed -e "s/PRODUCTNAME/YaraHunter/" $< > $@

tmp/packetstreamer-template.svg: template.svg
	sed -e "s/PRODUCTNAME/PacketStreamer/" $< > $@

tmp/flowmeter-template.svg: template.svg
	sed -e "s/PRODUCTNAME/FlowMeter/" $< > $@

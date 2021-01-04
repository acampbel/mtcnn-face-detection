function runPerfTests

results = runperf("Superclass", "matlab.perftest.TestCase");

cppjson = perfresults2json(results);
fid = fopen("cpp-benchmark-data.json","w","n","UTF-8");
cl = onCleanup(@() fclose(fid));
fprintf(fid,"%s",cppjson);

pyjson = perfresults2pybenchjson(results);
fid = fopen("py-benchmark-data.json","w","n","UTF-8");
cl = onCleanup(@() fclose(fid));
fprintf(fid,"%s",pyjson);


disp(fileread("cpp-benchmark-data.json"))
disp(fileread("py-benchmark-data.json"))

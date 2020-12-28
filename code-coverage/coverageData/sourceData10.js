var sourceData10 = {"FileContents":["classdef DlNetworkStrategy < handle","    ","    properties (SetAccess=private)","        UseGPU","        % Weights for the networks","        PnetWeights","        RnetWeights","        OnetWeights","    end","    ","    methods","        function obj = DlNetworkStrategy(useGpu)","            obj.UseGPU = useGpu;","        end","        ","        function load(obj)","            % loadWeights   Load the network weights from file.","            obj.PnetWeights = load(fullfile(mtcnnRoot(), \"weights\", \"pnet.mat\"));","            obj.RnetWeights = load(fullfile(mtcnnRoot(), \"weights\", \"rnet.mat\"));","            obj.OnetWeights = load(fullfile(mtcnnRoot(), \"weights\", \"onet.mat\"));","            ","            if obj.UseGPU","                obj.PnetWeights = dlupdate(@gpuArray, obj.PnetWeights);","                obj.RnetWeights = dlupdate(@gpuArray, obj.RnetWeights);","                obj.OnetWeights = dlupdate(@gpuArray, obj.OnetWeights);","            end","        end","        ","        function [probability, correction] = applyPNet(obj, im)","            im = dlarray(im, \"SSCB\");","            ","            [probability, correction] = mtcnn.pnet(im, obj.PnetWeights);","            ","            probability = extractdata(gather(probability));","            correction = extractdata(gather(correction));","        end","        ","        function [probs, correction] = applyRNet(obj, im)","            im = dlarray(im, \"SSCB\");","            ","            [probs, correction] = mtcnn.rnet(im, obj.RnetWeights);","            ","            probs = extractdata(probs)';","            correction = extractdata(correction)';","        end","        ","        function [probs, correction, landmarks] = applyONet(obj, im)","            im = dlarray(im, \"SSCB\");","            ","            [probs, correction, landmarks] = mtcnn.onet(im, obj.OnetWeights);","            ","            probs = extractdata(probs)';","            correction = extractdata(correction)';","            landmarks = extractdata(landmarks)';","        end","        ","    end","end"],"CoverageData":{"CoveredLineNumbers":[13,18,19,20,22,30,32,34,35,39,41,43,44,48,50,52,53,54],"UnhitLineNumbers":[23,24,25],"HitCount":[0,0,0,0,0,0,0,0,0,0,0,0,25,0,0,0,0,25,25,25,0,25,0,0,0,0,0,0,0,185,0,185,0,185,185,0,0,0,21,0,21,0,21,21,0,0,0,20,0,20,0,20,20,20,0,0,0,0]}}
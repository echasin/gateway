import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';
import { Response } from '@angular/http';

import { Model } from './model.model';
import { ModelService } from './model.service';
import { AssetService } from '../asset/asset.service';
import { Asset } from '../asset/asset.model';

import { AssetassetmbrService } from '../assetassetmbr/assetassetmbr.service';
import { Assetassetmbr } from '../assetassetmbr/assetassetmbr.model';

import * as joint from 'jointjs';

import {V, g} from "jointjs";
import * as $ from "jquery";


@Component({
    selector: 'jhi-model-detail',
    templateUrl: './model-detail.component.html'
})
export class ModelDetailComponent implements OnInit, OnDestroy {


    assets: Asset[];
    assetassetmbr: Assetassetmbr={};
    private assetasset=[];
    model: Model;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    
    private graph = new joint.dia.Graph;  

    constructor(
        private eventManager: EventManager,
        private modelService: ModelService,
        private assetService: AssetService,
        private assetassetmbrService: AssetassetmbrService, 
        private route: ActivatedRoute
    ) {
    }
         
    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        
          this.subscription = this.route.params.subscribe((params) => {
            this.loadAssetassetmbr(params['id']);
        });
        
        this.registerChangeInModels();
        this.buildCanvas();
        
    }

    load(id) {
        this.modelService.find(id).subscribe((model) => {
            this.model = model;
        });
    }
    
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInModels() {
        this.eventSubscriber = this.eventManager.subscribe(
            'modelListModification',
            (response) => this.load(this.model.id)
        );
    }
    
    
      buildCanvas(){
          const paper = new joint.dia.Paper({
              el: $('#paper'),
              width: 650,
              height: 400,
              gridSize: 20,
              model: this.graph,
              markAvailable: true,
              linkConnectionPoint: joint.util.shapePerimeterConnectionPoint,
              snapLinks: true
         });
        }
          
     findByKey(array, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === value) {
                return array[i];
            }
        }
        return null;
    }
    
     findCell(array,value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].attributes.attrs.instance === value) {
                return array[i];
            }
        }
        return null;
    }

    
        loadAssetassetmbr(id){
            this.assetassetmbrService.loadAssetassetmbr(id).subscribe(
               (res: Response) => {
                    var arr=[];
                    for(var i=0;i< res.json().length;i++){
                        var a;
                        var b;
                        var child=this.findByKey(arr,res.json()[i].childinstance);
                        var parent=this.findByKey(arr,res.json()[i].parentinstance);
                        if(parent ===null && child ===null){                           
                             arr.push(res.json()[i].parentinstance);
                             a = new joint.shapes.basic.Rect({
                              position: {x: res.json()[i].parentxcoordinate, y: res.json()[i].parentycoordinate},
                              rect: { fill: "red" },
                              size: {width: 100, height: 40},
                              attrs: {text: {text: res.json()[i].parentasset.nameshort}}
                            });
                             a.attr('instance', res.json()[i].parentinstance)
                             this.graph.addCell(a);
                             arr.push(res.json()[i].childinstance);
                              b = new joint.shapes.basic.Rect({
                              position: {x: res.json()[i].childxcoordinate, y: res.json()[i].childycoordinate},
                              rect: { fill: "red" },
                              size: {width: 100, height: 40},
                              attrs: {text: {text: res.json()[i].childasset.nameshort}}
                           });
                            b.attr('instance', res.json()[i].childinstance)
                            this.graph.addCell(b);
                            this.graph.addCell(new joint.dia.Link({
                               source: { id:a.id},
                               target: { id:b.id},
                            }));
                    }
                      if(parent ===null && child !=null){  
                      
                           var models=this.graph.attributes.cells.models;
                          var childCell=this.findCell(models,child);
                          arr.push(res.json()[i].parentinstance);
                                b = new joint.shapes.basic.Rect({
                              position: {x: res.json()[i].parentxcoordinate, y: res.json()[i].parentycoordinate},
                              rect: { fill: "red" },
                              size: {width: 100, height: 40},
                              attrs: {text: {text: res.json()[i].parentasset.nameshort}}
                           });
                          b.attr('instance', res.json()[i].parentinstance)
                            this.graph.addCell(b);
                          
                            this.graph.addCell(new joint.dia.Link({
                               source: { id:childCell.id},
                               target: { id:b.id},
                            }));
                      
                      }
                        
                      if(parent !=null && child ===null){  
                          var models=this.graph.attributes.cells.models;
                          console.log(parent)
                          var parentCell=this.findCell(models,parent);
                          arr.push(res.json()[i].childinstance);
                                b = new joint.shapes.basic.Rect({
                              position: {x: res.json()[i].childxcoordinate, y: res.json()[i].childycoordinate},
                              rect: { fill: "red" },
                              size: {width: 100, height: 40},
                              attrs: {text: {text: res.json()[i].childasset.nameshort}}
                           });
                          b.attr('instance', res.json()[i].childinstance)
                            this.graph.addCell(b);
                          
                            this.graph.addCell(new joint.dia.Link({
                               source: { id:parentCell.id},
                               target: { id:b.id},
                            }));
                      }  
                        
                     }
            }
          );
    }
        
}

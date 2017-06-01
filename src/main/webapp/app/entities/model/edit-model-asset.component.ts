import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { EventManager , AlertService } from 'ng-jhipster';
import { Response } from '@angular/http';
import { Model } from './model.model';
import { ModelService } from './model.service';
import { AssetService } from '../asset/asset.service';
import { Asset } from '../asset/asset.model';
import { AssetassetmbrService } from '../assetassetmbr/assetassetmbr.service';
import { Assetassetmbr } from '../assetassetmbr/assetassetmbr.model';
import { Principal } from '../../shared';

import * as joint from 'jointjs';

import {V, g} from "jointjs";
import * as $ from "jquery";


@Component({
    selector: 'jhi-edit-modelasset',
    templateUrl: './edit-model-asset.component.html'
})
export class EditModelAsset implements OnInit, OnDestroy {

    
    assets: Asset[];
    assetassetmbr: Assetassetmbr={};
    private assetasset=[];
    model: Model;
    line: boolean;
    error: any;
    success: any;
    isSaving: boolean;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    
    private graph = new joint.dia.Graph;   

    constructor(
        private eventManager: EventManager,
        private modelService: ModelService,
        private alertService: AlertService,
        private assetService: AssetService,  
        private assetassetmbrService: AssetassetmbrService,      
        private route: ActivatedRoute,
        private principal: Principal
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
        this.loadAllAssets();
       // this.loadAssetassetmbr();
        this.buildCanvas();
        this.buildTree();
    }

    load(id) {
        this.modelService.find(id).subscribe((model) => {
            this.model = model;
        });
    }
    
     loadAllAssets(){
        this.assetService.query().subscribe(
            (res: Response) => this.onSuccessLoadAllAssets(res.json(), res.headers),
            (res: Response) => this.onError(res.json())
         );
    
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
            if(array[i].attributes.type === "basic.Rect"){
            if (array[i].attributes.attrs.instance === value) {
                return array[i];
            }
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
                        var child=this.findByKey(arr,res.json()[i].assetassetmbr.childinstance);
                        var parent=this.findByKey(arr,res.json()[i].assetassetmbr.parentinstance);
                        console.log(res.json()[i]);
                      if(parent ===null && child ===null){ 
                             arr.push(res.json()[i].assetassetmbr.parentinstance);
                             a = new joint.shapes.basic.Rect({
                              position: {x: res.json()[i].assetassetmbr.parentxcoordinate, y: res.json()[i].assetassetmbr.parentycoordinate},
                              size: {width: 100, height: 40},
                              attrs: {rect: { fill: res.json()[i].parentcolor },text: {text: res.json()[i].assetassetmbr.parentasset.nameshort}}
                            });
                             a.attr('instance', res.json()[i].assetassetmbr.parentinstance);
                             a.attr('id', res.json()[i].assetassetmbr.parentasset.id);
                             this.graph.addCell(a);
                             arr.push(res.json()[i].assetassetmbr.childinstance);
                              b = new joint.shapes.basic.Rect({
                              position: {x: res.json()[i].assetassetmbr.childxcoordinate, y: res.json()[i].assetassetmbr.childycoordinate},
                              size: {width: 100, height: 40},
                              attrs: {rect: { fill: res.json()[i].childcolor },text: {text: res.json()[i].assetassetmbr.childasset.nameshort}}
                           });
                            b.attr('instance', res.json()[i].assetassetmbr.childinstance)
                            b.attr('id', res.json()[i].assetassetmbr.childasset.id);
                            this.graph.addCell(b);
                            this.graph.addCell(new joint.dia.Link({
                               source: { id:a.id},
                               target: { id:b.id},
                            }));
                    }
                      if(parent ===null && child !=null){  
                           var models=this.graph.attributes.cells.models;
                           var childCell=this.findCell(models,child);
                           arr.push(res.json()[i].assetassetmbr.parentinstance);
                                b = new joint.shapes.basic.Rect({
                              position: {x: res.json()[i].assetassetmbr.parentxcoordinate, y: res.json()[i].assetassetmbr.parentycoordinate},
                              size: {width: 100, height: 40},
                              attrs: {rect: { fill: res.json()[i].parentcolor },text: {text: res.json()[i].assetassetmbr.parentasset.nameshort}}
                           });
                          b.attr('instance', res.json()[i].assetassetmbr.parentinstance);
                          b.attr('id', res.json()[i].assetassetmbr.parentasset.id);
                            this.graph.addCell(b);
                          
                            this.graph.addCell(new joint.dia.Link({
                               source: { id:childCell.id},
                               target: { id:b.id},
                            }));
                      
                      }
                        
                      if(parent !=null && child ===null){
                          var models=this.graph.attributes.cells.models;
                          console.log(models)
                          var parentCell=this.findCell(models,parent);
                          console.log(parentCell);
                          arr.push(res.json()[i].assetassetmbr.childinstance);
                             b = new joint.shapes.basic.Rect({
                              position: {x: res.json()[i].assetassetmbr.childxcoordinate, y: res.json()[i].assetassetmbr.childycoordinate},
                              size: {width: 100, height: 40},
                              attrs: {rect: { fill: res.json()[i].childcolor },text: {text: res.json()[i].assetassetmbr.childasset.nameshort}}
                           });
                            b.attr('instance', res.json()[i].assetassetmbr.childinstance)
                            b.attr('id', res.json()[i].assetassetmbr.childasset.id);
                            this.graph.addCell(b);
                            this.graph.addCell(new joint.dia.Link({
                               source: { id:parentCell.id},
                               target: { id:b.id},
                            }));
                      } 
                        
                        
                         if(parent !=null && child !=null){  
                          var models=this.graph.attributes.cells.models;
                          console.log(models)
                          var parentCell=this.findCell(models,parent);
                          var childCell=this.findCell(models,child);   

                            this.graph.addCell(new joint.dia.Link({
                               source: { id:parentCell.id},
                               target: { id:childCell.id},
                            }));
                      } 
                        
                     }
            }
          );
    }
    
    private onSuccessLoadAllAssets(data, headers) {
         this.assets = data;
    }
    
    
    buildTree(){
        
    }
    
    private onError(error) {
        this.alertService.error(error.message, null, null);
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
              gridSize: 10,
              model: this.graph,
              markAvailable: true,
              linkConnectionPoint: joint.util.shapePerimeterConnectionPoint,
              snapLinks: true
            });
        
        paper.drawGrid(true);
        

        
      paper.on('cell:pointerup', (cellView, evt, x, y) => {
          if(this.line==true){
               this.graph.addCell(new joint.dia.Link({
                   source: { id:cellView.model.id},
                   target: { x: x, y: y+70 },
               }));
              this.line=false; 
           }
      });
        
                
        this.graph.on('change:source change:target', (link) => {
            
            if (link.get('source').id && link.get('target').id) {
                var source = this.graph.getCell(link.get('source'));
                var target = this.graph.getCell(link.get('target'));
                this.assetasset.push({"sourceId": source.attributes.attrs.id,"targetId": target.attributes.attrs.id,"parentxcoordinate": source.attributes.position.x,"parentycoordinate": source.attributes.position.y,"childxcoordinate": target.attributes.position.x,"childycoordinate": target.attributes.position.y,"parentInstance":source.attributes.attrs.instance,"childInstance":target.attributes.attrs.instance});                        
            }
        });
     }

    saveModel(){
        for(var mbr=0;mbr<this.assetasset.length;mbr++){            
             this.save(mbr); 
        }
     }
        
    
        
        save(mbr){
            var parentasset;
            var childasset;
           
            this.assetassetmbr.model=this.model;   
            console.log(mbr);            
            console.log(this.assetasset);
            
            this.principal.identity().then((account) => {
              Observable.forkJoin( this.assetService.find(this.assetasset[mbr].sourceId), this.assetService.find(this.assetasset[mbr].targetId)).subscribe(res => {
                    this.assetassetmbr.parentasset=res[0];
                    this.assetassetmbr.childasset=res[1];
                    this.assetassetmbr.comment="comment";
            this.assetassetmbr.parentxcoordinate=this.assetasset[mbr].parentxcoordinate;
            this.assetassetmbr.parentycoordinate=this.assetasset[mbr].parentycoordinate;
            this.assetassetmbr.childxcoordinate=this.assetasset[mbr].childxcoordinate;
            this.assetassetmbr.childycoordinate=this.assetasset[mbr].childycoordinate;
            
            this.assetassetmbr.parentinstance=this.assetasset[mbr].parentInstance;
            this.assetassetmbr.childinstance=this.assetasset[mbr].childInstance;
            
            this.assetassetmbr.nameshort="nameshort";
            this.assetassetmbr.status="active";
            this.assetassetmbr.lastmodifiedby=account.lastModifiedBy;
                  this.subscribeToSaveResponse(this.assetassetmbrService.create(this.assetassetmbr));  
               // this.assetasset=[];
              });
            });
           
        }

      private subscribeToSaveResponse(result: Observable<Assetassetmbr>) {
        result.subscribe((res: Assetassetmbr) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    
      }
    
      private onSaveSuccess(result: Assetassetmbr) {
        this.eventManager.broadcast({ name: 'assetassetmbrListModification', content: 'OK'});
        this.isSaving = false;
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }
    
    
    addAsset(id,nameshort){
       this.assetService.getColor(id).subscribe(res => {
        const a = new joint.shapes.basic.Rect({
          position: {x: 50, y: 50},
          size: {width: 100, height: 40},
          attrs: {rect: { fill: res['_body'] },text: {text: nameshort}}
       });
        a.attr('instance', a.id)
        a.attr('id', id)
        this.graph.addCell(a);
            
           });
     }
    
    addLine(){
       this.line=true;        
    }
        
}

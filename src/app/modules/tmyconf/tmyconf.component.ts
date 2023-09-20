import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TmyconfService } from 'src/app/services/tmyconf.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tmyconf',
  templateUrl: './tmyconf.component.html',
  styleUrls: ['./tmyconf.component.scss']
})
export class TmyconfComponent implements OnInit {
  tmyConfigurationList: any = [];
  isLoaded: boolean = false
  editTmyConfForm: any;
  tmyConfFormGroup: any;
  submitted: boolean = false;
  closeResult: string ="";
  tmyConfDetails: any;
  tmyCongId: any;
  searchTmyConfig:any;

  constructor(
    private serviceTmyconf : TmyconfService,
    private fb: FormBuilder,
    private modalService: NgbModal,

    ) { }
      ngOnInit(): void {
        this.OnGetAllConfigurations()
          //Construction et validation des champs modifiés
          this.editTmyConfForm = this.fb.group({
            id:[''],
            project_name:['',Validators.required],
            latitude:['',Validators.required],
            longitude:['',Validators.required],
            altitude:['',Validators.required],
            technology:['',Validators.required],
            pv_description:['',[Validators.required]],

            tilt:['',Validators.required],
            azimuth: ['',Validators.required],
            tracker_description: ['',Validators.required],
            gcr: ['',Validators.required],
            axis_azimuth: ['',Validators.required],
            max_angle: ['',Validators.required],
            request_id: ['',Validators.required],

            p50: ['',Validators.required],
            p75: ['Select',Validators.required],
            p90: ['Select',Validators.required],
            p10: ['Select',Validators.required],
            p99: ['Select',Validators.required],
            ambient_temperature: ['',Validators.required],
            pm_2_5: ['Select',Validators.required],
            pm_10: ['Select',Validators.required],
            relative_humidity: ['',Validators.required],
            precipitable_water: ['',Validators.required],
            wind_direction: ['',Validators.required],
            granularity: ['',Validators.required],
          });

         
          this.tmyConfFormGroup = this.fb.group({
            project_name:['',Validators.required],
            latitude:['',Validators.required],
            longitude:['',Validators.required],
            altitude:['',Validators.required],
            technology:['',Validators.required],
            pv_description:['',[Validators.required]],
            tilt:['',Validators.required],
            azimuth: ['',Validators.required],
            tracker_description: ['',Validators.required],
            gcr: ['',Validators.required],
            axis_azimuth: ['',Validators.required],
            max_angle: ['',Validators.required],
            request_id: ['',Validators.required],
            p50: ['Select',Validators.required],
            p75: ['Select',Validators.required],
            p90: ['Select',Validators.required],
            p10: ['Select',Validators.required],
            p99: ['Select',Validators.required],
            ambient_temperature: ['',Validators.required],
            pm_2_5: ['Select',Validators.required],
            pm_10: ['Select',Validators.required],
            relative_humidity: ['',Validators.required],
            precipitable_water: ['',Validators.required],
            wind_direction: ['',Validators.required],
            granularity: ['',Validators.required],
          })
      }

  getCurrentDateTime(): string {
    const currentDateTime = new Date();
    return currentDateTime.toISOString(); // Or format the date as per your requirement
  }    

  //This method is use to fetch the data from the API    
  OnGetAllConfigurations(){
    this.serviceTmyconf.getAllTmyConf().subscribe((data:any)=>{
      this.tmyConfigurationList = data;
      this.isLoaded = true
    })
  }

  //This method is use to download the yaml configuration file
  onDownloadConfiguration(tmyconf:any): void {
    this.serviceTmyconf.downloadFileTmyConf(tmyconf.id).subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/x-yaml' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.getCurrentDateTime()+'_'+tmyconf.project_name+'_config_'+tmyconf.id+'.yml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error downloading the file', error);
      }
    );
  }

  get f() { return this.tmyConfFormGroup.controls; }

  //Cette methode nous permet de soumettre le formulaire
  onCreate( ) {
     this.submitted = true;

         // stop here if the form is invalid
         if (this.tmyConfFormGroup.invalid) {
             return;
         }
     this.serviceTmyconf.postTmyConf (this.tmyConfFormGroup.value).subscribe((resp:any) => {
       this.serviceTmyconf.showNotification(resp.message,'success')
       this.modalService.dismissAll();
       this.ngOnInit(); //reload the table
       }, err =>{
         if (err.status == 400){
           this.serviceTmyconf.showNotification("<h3>Failed to create this Configuration.</h3>",'danger')
          }else{
           this.serviceTmyconf.showNotification("<h3>Failed to create this Configuration, something was wrong.</h3>",'danger')
         }
           this.modalService.dismissAll();
     });
    }

//Cette methode permet de souvegarder la mise à jour faite sur une configuration
onUpdate(){
   this.serviceTmyconf.upDateTmyConf(this.editTmyConfForm.value).subscribe((resp:any) => {
     this.serviceTmyconf.showNotification(resp.message,'success');
       this.ngOnInit();
       this.modalService.dismissAll();
     },err=>{
       if (err.status == 400){
            this.serviceTmyconf.showNotification("<h3>Failed to update the informations.</h3>",'danger')
       }else{
            this.serviceTmyconf.showNotification(err.error.message,'danger')
       }
       this.modalService.dismissAll();
   })
}

//Cette methode permet de supprimer une configuration
onDelete(){
  this.serviceTmyconf.deleteTmyConf (this.tmyCongId).subscribe((results:any) => {
    this.serviceTmyconf.showNotification(results.message,'success');
     this.ngOnInit();
      this.modalService.dismissAll();
    },err=>{
     if (err.status == 400 && err.error.message=='14'){
       this.serviceTmyconf.showNotification("<h3>Failed to delete this configuration.</h3>",'danger')
    }else{
       this.serviceTmyconf.showNotification("<h3>Failed to delete this configuration, something was wrong.</h3>",'danger')
  }
  this.modalService.dismissAll();
  });
}

//Cette methode nous permet d'ouvrir le formulaire de saisie d'une configuration
open(content: any) {
  this.modalService.open(content, {
    ariaLabelledBy: 'modal-basic-title',size:'lg'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

 //Cette methode permet de fermer les differents dialogue
 private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}

//Cette methode nous permet d'afficher les details de l'element sectionner sur le tableau via le bouton Details
openDetails(targetModal: any, tmyCong: any) {
   this.tmyConfDetails = tmyCong;
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'lg'
  });
 }
 
 //Methode pour ouvrir le formulaire de modification d'une configuration.
 openEdit(targetModal: any, tmyCong: any) {
   this.submitted = false
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'lg'
  });
  this.editTmyConfForm.patchValue({
    id : tmyCong.id,
    project_name:tmyCong.project_name,
    latitude:tmyCong.location!=null?tmyCong.location.latitude:"",
    longitude:tmyCong.location!=null?tmyCong.location.longitude:"",
    altitude:tmyCong.location!=null?tmyCong.location.altitude:"",
    technology: tmyCong.pv_system!=null?tmyCong.pv_system.technology:"",
    pv_description: tmyCong.pv_system!=null?tmyCong.pv_system.pv.description:"",
    tilt: tmyCong.pv_system!=null?tmyCong.pv_system.pv.tilt:"",
    azimuth: tmyCong.pv_system!=null?tmyCong.pv_system.pv.azimuth:"",
    tracker_description: tmyCong.pv_system!=null?tmyCong.pv_system.tracker.description:"",
    gcr: tmyCong.pv_system!=null?tmyCong.pv_system.tracker.gcr:"",
    axis_azimuth: tmyCong.pv_system!=null?tmyCong.pv_system.tracker.axis_azimuth:"",
    max_angle: tmyCong.pv_system!=null?tmyCong.pv_system.tracker.max_angle:"",
    request_id: tmyCong.analysis!=null?tmyCong.analysis.request_id:"",
    p50: tmyCong.analysis!=null?tmyCong.analysis.probabilities.P50:"",
    p75: tmyCong.analysis!=null?tmyCong.analysis.probabilities.P75:"",
    p90: tmyCong.analysis!=null?tmyCong.analysis.probabilities.P90:"",
    p10: tmyCong.analysis!=null?tmyCong.analysis.probabilities.P10:"",
    p99: tmyCong.analysis!=null?tmyCong.analysis.probabilities.P99:"",
    ambient_temperature: tmyCong.analysis!=null?tmyCong.analysis.meteo_data.ambient_temperature:"",
    pm_2_5:tmyCong.analysis!=null?tmyCong.analysis.meteo_data.pm_2_5:"",
    pm_10: tmyCong.analysis!=null?tmyCong.analysis.meteo_data.pm_10:"",
    relative_humidity: tmyCong.analysis!=null?tmyCong.analysis.meteo_data.relative_humidity:"",
    precipitable_water: tmyCong.analysis!=null?tmyCong.analysis.meteo_data.precipitable_water:"",
    wind_direction: tmyCong.analysis!=null?tmyCong.analysis.meteo_data.wind_direction:"",
    granularity: tmyCong.analysis!=null?tmyCong.analysis.granularity:"",
  });
 }
 
 //Methode pour ouvrir le formulaire le dialogue pour avertir l'utilisateur lorsqu'il essai de supprimer un element
 openDelete(targetModal: any, tmyCong: any) {
   this.tmyCongId = tmyCong.id;
   this.modalService.open(targetModal, {
     backdrop: 'static',
     size: 'lg'
   });
 }
 

}

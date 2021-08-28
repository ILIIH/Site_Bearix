
var magazine = new Array();
magazine.push({"numb":228,"col":78,"name":"Jolufulu"})


console.log(magazine[0].numb)



table= document.getElementById('tableBtn');
table.onclick = function(event) {
  let target = event.target; 
  var cel1,cel2,cel3;

  cel1=document.getElementById('FStep');
  cel2=document.getElementById('SecStep');
  cel3=document.getElementById('ThirdStep');
  cel1.classList.remove('active');
  cel2.classList.remove('active');
  cel3.classList.remove('active');
  target.classList.add('active'); 
  if(target.id=="SecStep"){
  document.getElementById("StageInfo").innerHTML="Создание искусственного интеллекта. Обучение искусственного интеллекта. Проверка корректности работы созданной модели";
  document.getElementById("StageTime").innerHTML="Время выполнения 2 - 3 месяцев";
  }

  if(target.id=="FStep"){
    document.getElementById("StageInfo").innerHTML="Создание веб приложения для лёгкого взаимодействия с пользователями. Сбор датасета. Анализ закономерностьей воникающих в испорченных подшипниках";
    document.getElementById("StageTime").innerHTML="Время выполнения 1 месяц";
    }
    
  if(target.id=="ThirdStep"){
    document.getElementById("StageInfo").innerHTML="Создание физической модели. Взаимодействия с бизнесом. Коррекция работы искусственного интеллекта.";
    document.getElementById("StageTime").innerHTML="Время выполнения 4 - 5 месяцев";
    }

};



      window.onresize = window.onload = function () {
        if (window.innerWidth < 700) {
          
          var hrStend = document.getElementById('hrStend');  
          hrStend.style.marginLeft="20px";
          var Title1S = document.getElementById('Title1S');    
          var StageInfo = document.getElementById('StageInfo');
          var StageTime= document.getElementById('StageTime');
          StageTime.style.width="70%"; 
          StageInfo.style.width="70%"; 
          StageInfo.style.marginTop="35px";
        
          Title1S.style.fontSize="9pt";
          Title1S.style.width="100%";
      }
    if (window.innerWidth < 1000) {
      

      var label1 = document.getElementById('lble1');
      label1.style.width="100%";
      var logo = document.getElementById('layout1');
      logo.style.backgroundColor="black";
      var MediaC = document.getElementById('MediaC');
      inst.style.marginLeft="auto" ;
      inst.style.marginRight="auto";
    }};
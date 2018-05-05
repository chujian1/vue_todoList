/**
 * Created by ypj on 18-5-3.
 */
/*------存取localStorage中的数据--------*/
var store = {
    save(key,value){
        localStorage.setItem(key,JSON.stringify(value))
    },
    fetch(key){
        return JSON.parse(localStorage.getItem(key)) || []
    }
};
var filter = {
    all(list){
        return list;
    },
    done(list){
        return list.filter((item)=>{
            return item.isChecked;
        })
    },
    todo(list){
        return list.filter((item)=>{
            return !item.isChecked;
        })
    }
};
var list = store.fetch("ypj");

/*var list = [
    {
        title:"吃饭",
        isChecked:false
    },
    {
        title:"睡觉",
        isChecked:true
    }
];*/
 var vm = new Vue({
    el:"#section",
    data:{
        list:list,
        todo:"",
        visibility:"all"//对数据进行筛选
    },
    watch:{
        /*浅度监控数据  是否发生改变，执行此函数
        list(){
            store.save("ypj",this.list)
        }*/
        list:{
            handler(){
                store.save("ypj",this.list)
            },
            deep:true
        }

    },
    computed:{
        filterList(){
            return filter[this.visibility] ? filter[this.visibility](list) : list ;
        }
    },
    methods:{
        addTodo(e){
                /*在时间处理函数中，this指向当前跟实例*/
                this.list.push({
                    title:this.todo,
                    isChecked:false
                });
            /*数据的双向绑定*/
            this.todo = ''
        },
        deleteTodo(item){
            var index = this.list.indexOf(item);
            this.list.splice(index,1);
        }
    }
});
function watchHashChange() {
    var hash = window.location.hash.slice(1);
    vm.visibility = hash;
}
watchHashChange();
window.addEventListener("hashchange",watchHashChange);
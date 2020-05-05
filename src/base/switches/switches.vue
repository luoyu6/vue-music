<template>
    <div>
        <ul class="tab-wrapper">
            <li v-for="(item,index) in switches" class='tab-item' @click='switchItem(index)' :key='index' >
                <span :class='{active:index===currentIndex}'>{{item.name}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props:{
        switches:Array,
        currentIndex:Number|String

    },
    methods:{
        switchItem(index){
            this.$emit('select',index)
        }
    }
    
}
</script>
<style scoped lang='stylus'>
.tab-wrapper
  display flex
&.active
   border-bottom: 2px solid #ffcd32;
   padding: 0 0 3px 0;
.tab-item
  flex:1
  text-align center

</style>
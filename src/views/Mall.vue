<template>
  <div>
    <el-dialog
      :title="titles"
      :before-close="handleClose"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <!-- 用户表单信息 -->
      <el-form
        ref="formMall"
        :rules="rules"
        :inline="true"
        :model="formMall"
        label-width="80px"
      >
        <el-form-item label="商品编号" prop="mallId">
          <el-input
            placeholder="请输入商品编号"
            v-model="formMall.mallId"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input
            placeholder="请输入商品名称"
            v-model="formMall.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="classify">
          <el-input
            placeholder="请输入商品名称"
            v-model="formMall.classify"
          ></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="number">
          <el-input
            placeholder="请输入数量"
            v-model="formMall.number"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌" prop="brand">
          <el-input
            placeholder="请输入商品品牌"
            v-model="formMall.brand"
          ></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="size">
          <el-input
            placeholder="请输入商品规格"
            v-model="formMall.size"
          ></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="cover">
            <el-input
            type="file"
            placeholder="请输入封面图"
            v-model="formMall.cover"
          ></el-input>
          <!-- <el-image
            style="width: 60px; height: 60px"
            :src="formMall.cover"
            :fit="fit"></el-image> -->
          <!-- <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="formMall.cover"
            list-type="picture"
          >
            <el-button size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload> -->
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input
            placeholder="请输入商品价格"
            v-model="formMall.price"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否上架" prop="pullFlag">
          <el-select v-model="formMall.pullFlag" placeholder="请选择">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
    <el-card>
      <h3 class="mallName">商品信息列表</h3>
      <div class="operateMall">
        <div class="seachMall">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="商品名称">
              <el-input
                v-model="formInline.name"
                placeholder="商品名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-input
                v-model="formInline.classify"
                placeholder="商品分类"
              ></el-input>
            </el-form-item>
            <el-form-item label="品牌">
              <el-input
                v-model="formInline.brand"
                placeholder="品牌"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="add">
          <el-button type="primary" @click="onAdd">添加</el-button>
          <el-button type="danger" @click="onDeleteMoll">批量删除</el-button>
        </div>
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="mallId" label="商品编号" width="120">
          </el-table-column>
          <el-table-column prop="name" label="商品名称" width="120">
          </el-table-column>
          <el-table-column prop="classify" label="商品分类" width="120">
          </el-table-column>
          <el-table-column prop="number" label="数量" width="120">
          </el-table-column>
          <el-table-column prop="brand" label="品牌" width="120">
          </el-table-column>
          <el-table-column prop="size" label="规格" width="120">
          </el-table-column>
          <el-table-column prop="cover" label="封面" width="120">
          </el-table-column>
          <el-table-column prop="price" label="价格" width="120">
          </el-table-column>
          <el-table-column prop="pullFlag" label="是否上架" width="120">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{
                scope.row.pullFlag === 1 ? "上架" : "下架"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" class="editMall">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="queryRow(scope.row)"
                size="mini"
              >
                查看
              </el-button>
              <el-button
                @click.native.prevent="ModifyRow(scope.row)"
                size="mini"
              >
                修改
              </el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.row)"
                type="danger"
                size="mini"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pager">
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            @current-change="handlePage"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getMall,addMall, delMall, editMall,batchremove } from "../api";
export default {
  data() {
    return {
      formInline: {
        name: "",
        classify: "",
        brand: "",
      },
      formMall: {
        mallId: "",
        name: "",
        classify: "",
        number: "",
        brand: "",
        size: "",
        cover: "",
        price: "",
        pullFlag: "",
      },
       rules: {
        mallId:[{required: true, message: "请输入编号"}],
        name: [{ required: true, message: "请输入商品名称" }],
        classify: [{ required: true, message: "请输入分类" }],
        number: [{ required: true, message: "请输入商品数量" }],
        brand: [{ required: true, message: "请输入商品品牌" }],
        size: [{ required: true, message: "请输入规格" }],
        cover:[{ required: true, message: "请选择封面" }],
        price:[{ required: true, message: "请输入价格" }],
        pullFlag:[{ required: true, message: "请选择是否上架" }]
      },
      tableData: [],
      multipleSelection: [],
      total: 0, //当前总条数
      pageData: {
        page: 1,
        limit: 10,
      },
      dialogVisible: false,
      modalType: 0, //0表示新增的弹窗，1表示编辑
      titles:'',
    };
  },
  methods: {
       // 封装获取商品列表函数
    getList() {
      console.log("进入获取函数");
      getMall({ params: { ...this.formInline, ...this.pageData } }).then(
        ({ data }) => {
          console.log(data, "data");
          this.tableData = data.list;
          this.total = data.count || 0;
        }
      );
    },
    // 多选
    handleSelectionChange() {
      this.multipleSelection = val;
    },
    // 增加商品
    onAdd() {
      this.dialogVisible = true;
      this.modalType = 0;
      this.titles='增加'
    },
    // 搜索商品
    onSubmit(){
        console.log('搜索')
        this.getList()
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
    //   查看当前条信息
    queryRow(row) {
        this.dialogVisible = true;
        this.modalType = 2;
        this.titles = '查看';
        this.formMall = JSON.parse(JSON.stringify(row))
    },
    // 修改商品信息
    ModifyRow(row) {
        console.log('修改')
        this.dialogVisible = true;
        this.modalType = 1;
        this.titles = '修改'
        this.formMall = JSON.parse(JSON.stringify(row));
    },
    // 删除商品信息
    deleteRow(row) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delMall({ mallId: row.mallId }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 批量删除
    onDeleteMoll(){
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
            console.log("123")
            let multipSelects = [];
            this.multipleSelection.forEach(val => {
                multipSelects.push(val.mallId)
            })
          batchremove({ids:multipSelects}).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
   
    // 确定提交增加或者修改的商品
    submit(){
        this.$refs.formMall.validate((valid) => {
        if (valid) {
          //   后续对表单数据处理
        //   增加商品
          if (this.modalType == 0) {
            addMall(this.formMall).then((val) => {
              console.log(val, "val");
              //新增成功后要刷新数据重新获取
              this.getList();
            });
          } else if(this.modalType == 1) {
            console.log('修改提交')
            editMall(this.formMall).then(() => {
              this.getList();
            });
          }
          console.log(this.form, "form");

          // 清空表单的数据
          this.$refs.formMall.resetFields();
          // 关闭弹窗
          this.dialogVisible = false;
        } else {
        }
      });
    },
    //   弹窗关闭的时候触发
    handleClose() {
      this.$refs.formMall.resetFields();
      this.dialogVisible = false;
    },
    cancel(){
        this.handleClose();
        console.log("form",this.formMall)
    },
    handleSelectionChange(val){
        this.multipleSelection = val;
        console.log('选项',this.multipleSelection)
    }
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.mallName {
  color: #3cb371;
  font-size: 22px;
  padding-bottom: 0.5rem;
  margin-bottom: 15px;
  border-bottom: 1px solid #eeeeee;
}
.operateMall {
  display: flex;
}
.editMall {
  display: flex;
  flex-wrap: nowrap;
}
</style>
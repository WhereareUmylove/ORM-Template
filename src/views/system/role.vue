<template>
  <div class="transfer" v-loading="$store.state.loading">
    <div class="search-box" v-if="getPermission('新增角色')">
      <el-button type="success" @click="showChange(1)" size="mini">新增角色</el-button>
    </div>
    <div class="list-box">
      <el-table :data="table" highlight-current-row stripe header-row-class-name="headerbg">
        <el-table-column :show-overflow-tooltip="true" prop="id" label="角色ID" />
        <el-table-column :show-overflow-tooltip="true" prop="name" label="角色名称" />
        <el-table-column :show-overflow-tooltip="true" prop="modified" label="修改时间" :formatter="formatterTime" />
        <el-table-column label="操作" fixed="right" width="240" v-if="getPermission('修改角色权限信息') && getPermission('删除角色')">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="showChange(2,row)" v-if="getPermission('修改角色权限信息')">修改</el-button>
            <el-button type="danger" size="mini" @click="showChange(3,row)" v-if="getPermission('删除角色')">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogForm" width="50%" @close="cancel">
      <el-form ref="formName" :rules="rule" :model="form" label-width="80px" v-loading="$store.state.loading">
        <el-form-item label="角色名称" prop="role">
          <el-input v-model="form.role" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-tree ref="tree" :data="permissionList" show-checkbox @check="checkChange" node-key="id">
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="dialogDelete" width="30%">
      <span>确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelete = false">取 消</el-button>
        <el-button type="primary" @click="deleteItem">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  getRole,
  addRole,
  getPermissionlist,
  getRolePermissionlist,
  updateRolePermission,
  delRole,
} from "@/api/order";
import { formatterTime } from "@/utils/type";
import { GValidate } from "@/utils/decorate";
import { rules } from "@/utils/rule";
import { getPermission } from "@/utils/storage";

@Component({
  components: {},
  methods: {
    formatterTime,
    getPermission,
  },
})
export default class App extends Vue {
  rule = rules;
  dialogTitle = "";
  table = [];
  permissionList = [
    { label: "用户管理", key: "user", children: <any>[] },
    { label: "项目管理", key: "project", children: [] },
    { label: "配置管理", key: "config", children: [] },
    { label: "理财管理", key: "money", children: [] },
    { label: "财务管理", key: "finance", children: [] },
    { label: "权限管理", key: "system", children: [] },
  ];
  total = 0;
  form = {
    permissionIds: <number[]>[],
    role: null,
  };
  roleID = null;
  dialogForm = false;
  dialogDelete = false;

  created() {
    this.initData();
  }
  async mounted() {
    let res = await getPermissionlist();
    if (res.code === 0) {
      let list = res.data.data;
      for (let i = 0; i < list.length; i++) {
        const e = list[i];
        for (let j = 0; j < this.permissionList.length; j++) {
          if (e.path.indexOf(this.permissionList[j].key) === 8) {
            this.permissionList[j].children.push({
              id: e.id,
              label: e.name,
            });
          }
        }
      }
    }
  }
  @GValidate("formName")
  async save() {
    this.dialogForm = false;
    let res;
    if (this.dialogTitle === "新增角色") {
      res = await addRole(this.form);
    } else if (this.dialogTitle === "修改角色") {
      res = await updateRolePermission({
        roleId: this.roleID,
        permissionIds: this.form.permissionIds,
      });
    }
    if (res.code === 0) {
      this.$message.success("操作成功！");
    }

    this.cancel();
    this.initData();
  }
  async showChange(type, row) {
    if (type === 3) {
      this.dialogDelete = true;
      this.roleID = row.id;
      return;
    }
    this.dialogForm = true;
    if (type === 1) {
      this.dialogTitle = "新增角色";
      this.$nextTick(function () {
        (this.$refs.tree as any).setCheckedKeys(
          this.form.permissionIds,
          true,
          false
        );
      });
    }
    if (type === 2) {
      this.dialogTitle = "修改角色";
      this.form.role = row.name;
      this.roleID = row.id;
      getRolePermissionlist({ roleid: row.id }).then((res) => {
        if (res.code === 0) {
          for (let i = 0; i < res.data.data.length; i++) {
            const e = res.data.data[i];
            this.form.permissionIds.push(e.id);
          }
          this.$nextTick(function () {
            (this.$refs.tree as any).setCheckedKeys(
              this.form.permissionIds,
              true,
              false
            );
          });
        }
      });
    }
  }
  cancel() {
    this.form = {
      permissionIds: [],
      role: null,
    };
    (this.$refs["formName"] as any).resetFields();
  }
  async deleteItem() {
    this.dialogDelete = false;
    let res = await delRole({ roleid: this.roleID });
    if (res.code === 0) {
      this.$message.success("删除成功！");
    }
    this.initData();
  }
  checkChange(data, b) {
    this.form.permissionIds = [];
    for (let i = 0; i < b.checkedNodes.length; i++) {
      const e = b.checkedNodes[i];
      if (e.id) {
        this.form.permissionIds.push(e.id);
      }
    }
  }

  async initData() {
    let res = await getRole();
    if (res.code === 0) {
      this.table = res.data.data;
      this.total = res.data.total;
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

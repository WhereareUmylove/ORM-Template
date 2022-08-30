<template>
  <div class="transfer" v-loading="$store.state.loading">
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="search-form" size="mini">
        <el-form-item>
          <el-input v-model="searchForm.user" placeholder="用户名" clearable @clear="searchForm.user = null" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchForm.phone" type="number" placeholder="手机号码" clearable @clear="searchForm.phone = null" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchForm.status" placeholder="状态" filterable clearable @clear="searchForm.status = null">
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="searchFormTime" type="datetimerange" range-separator="~" start-placeholder="创建开始日期" end-placeholder="创建结束日期" value-format="timestamp" :default-time="['00:00:00', '23:59:59']" :unlink-panels="true" clearable />
        </el-form-item>
        <el-button type="primary" @click="search" size="mini">搜索</el-button>
        <el-button type="success" @click="showDialog(0)" size="mini" v-if="getPermission('新增用户')">新增</el-button>
      </el-form>
    </div>
    <div class="list-box">
      <el-table :data="table" highlight-current-row stripe header-row-class-name="headerbg">
        <el-table-column :show-overflow-tooltip="true" prop="id" label="用户编号" min-width="80" />
        <el-table-column :show-overflow-tooltip="true" prop="name" label="用户名" width="100" min-width="100" />
        <el-table-column :show-overflow-tooltip="true" prop="nick" label="用户昵称" width="100" min-width="100" />
        <el-table-column :show-overflow-tooltip="true" prop="role" label="角色" min-width="80" />
        <el-table-column :show-overflow-tooltip="true" prop="country" label="国际区号" min-width="80" />
        <el-table-column :show-overflow-tooltip="true" prop="phone" label="手机号码" min-width="150" />
        <el-table-column :show-overflow-tooltip="true" label="状态">
          <template slot-scope="{ row }">
            <el-switch :active-value="1" :inactive-value="0" v-model="row.status" @change="changeSwitch(row.id,row.status)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="created" label="创建时间" min-width="170" :formatter="formatterTime" />
        <el-table-column label="操作" fixed="right" width="240" v-if="getPermission('修改用户信息') && getPermission('删除用户') && getPermission('重置密码')">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="showDialog(1,row)" v-if="getPermission('修改用户信息')">修改</el-button>
            <el-button type="danger" size="mini" @click="showDialog(2,row)" v-if="getPermission('删除用户')">删除</el-button>
            <el-button type="warning" size="mini" @click="showDialog(3,row)" v-if="getPermission('重置密码')">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-box">
        <el-pagination background :current-page="searchForm.page" layout="total, prev, pager, next, jumper" :total="total" @current-change="handleCurrentChange" />
      </div>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogForm" width="30%" @close="cancel">
      <el-form ref="formName" :rules="rule" :model="form" label-width="100px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nick">
          <el-input v-model="form.nick"></el-input>
        </el-form-item>
        <el-form-item label="国际区号" prop="country">
          <el-input v-model.number="form.country" type="number">
            <template slot="prepend">+</template>
          </el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model.number="form.phone" type="number"></el-input>
        </el-form-item>
        <el-form-item v-if="dialogTitle==='新增'" label="密码" prop="pwd">
          <el-input v-model="form.pwd" :type="showPwd">
            <i slot="suffix" class="el-icon-key" @mouseenter="showPwd = 'text'" @mouseleave="showPwd = 'password'"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="form.roleId" filterable>
            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="重置密码" :visible.sync="dialogPwd" width="30%" @close="cancel">
      <el-form ref="pwdForm" :rules="rule" :model="pwdForm" label-width="80px">
        <el-form-item label="新密码" prop="pwd">
          <el-input v-model="pwdForm.pwd" :type="showPwd">
            <i slot="suffix" class="el-icon-key" @mouseenter="showPwd = 'text'" @mouseleave="showPwd = 'password'"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPwd = false">取 消</el-button>
        <el-button type="primary" @click="changePwd">确 定</el-button>
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
  getUserlist,
  changeUserStatus,
  changeUserPwd,
  addUser,
  updateUser,
  delUser,
  getRole,
} from "@/api/order";
import { formatterTime } from "@/utils/type";
import { GValidate } from "@/utils/decorate";
import { rules } from "@/utils/rule";
import { getPwd } from "@/utils/common";
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
  showPwd = "password";
  searchFormTime = [];
  coins = [];
  searchForm = {
    user: null,
    phone: null,
    startime: null,
    endtime: null,
    status: null,
    page: 1,
    size: 10,
  };
  form = {
    country: null,
    name: null,
    nick: null,
    phone: null,
    pwd: "",
    roleId: null,
    id: null,
  };
  pwdForm = {
    pwd: "",
    userId: null,
  };
  detail = {};
  table = [];
  roleList = [];
  total = 0;
  dialogTitle = "";

  dialogForm = false;
  dialogDelete = false;
  dialogPwd = false;

  useridForm = null;

  created() {
    this.initData();
  }

  search() {
    this.searchForm.page = 1;
    this.searchForm.startime = this.searchFormTime
      ? this.searchFormTime[0]
      : null;
    this.searchForm.endtime = this.searchFormTime
      ? this.searchFormTime[1]
      : null;
    this.initData();
  }

  async initData() {
    let res = await getUserlist(this.searchForm);
    if (res.code === 0) {
      this.table = res.data.data;
      this.total = res.data.total;
    }
  }
  async showDialog(type, row) {
    if ([0, 1].includes(type)) {
      let r = await getRole();
      if (r.code === 0) {
        this.roleList = r.data.data;
      }
    }
    if (type === 0) {
      this.dialogTitle = "新增";
      this.dialogForm = true;
    }
    if (type === 1) {
      this.dialogTitle = "修改";
      Object.keys(this.form).forEach((key) => {
        this.form[key] = row[key];
      });
      let roleId = this.roleList.find((item: any) => {
        return item.name === row.role;
      });
      this.form.roleId = (roleId as any).id;
      this.form.country = (this.form.country as any).replace("+", "");
      this.dialogForm = true;
    }
    if (type === 2) {
      this.dialogDelete = true;
      this.useridForm = row.id;
    }
    if (type === 3) {
      this.dialogPwd = true;
      this.pwdForm.userId = row.id;
    }
  }
  @GValidate("formName")
  async save() {
    this.dialogForm = false;
    let res;
    if (this.form.country) {
      (this.form.country as any) = "+" + this.form.country;
    }
    if (this.form.phone === null) {
      this.form.country = null;
    }
    if (this.dialogTitle === "新增") {
      this.form.pwd = getPwd(this.form.pwd);
      res = await addUser(this.form);
    } else if (this.dialogTitle === "修改") {
      res = await updateUser(this.form);
    }
    if (res.code === 0) {
      this.$message.success("操作成功！");
    }
    this.initData();
  }
  @GValidate("pwdForm")
  async changePwd() {
    this.dialogPwd = false;
    this.pwdForm.pwd = getPwd(this.pwdForm.pwd);
    let res = await changeUserPwd(this.pwdForm);
    if (res.code === 0) {
      this.$message.success("操作成功！");
    }
    this.initData();
  }
  async deleteItem() {
    this.dialogDelete = false;
    let res = await delUser({ userid: this.useridForm });
    if (res.code === 0) {
      this.$message.success("删除成功！");
    }
    this.initData();
  }
  async changeSwitch(userId, status) {
    let res = await changeUserStatus({ userId, status });
    if (res.code === 0) {
      this.$message.success("操作成功！");
    }
    this.initData();
  }
  cancel() {
    this.form = {
      country: null,
      name: null,
      nick: null,
      phone: null,
      pwd: "",
      roleId: null,
      id: null,
    };
    this.pwdForm = {
      pwd: "",
      userId: null,
    };
    if (this.$refs["formName"]) {
      (this.$refs["formName"] as any).resetFields();
    }
    if (this.$refs["pwdForm"]) {
      (this.$refs["pwdForm"] as any).resetFields();
    }
  }

  handleCurrentChange(page) {
    this.searchForm.page = page;
    this.initData();
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-dialog {
  .el-icon-key {
    cursor: pointer;
    color: black;
  }
}
</style>

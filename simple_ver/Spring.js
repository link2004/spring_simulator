class Spring extends createjs.Shape{
    //getter
    getX() {return this.x}; //X座標を返す
    getY() {return this.y}; //Y座標を返す

    //コンストラクタ
    constructor(){

        super();                //親クラスのコンストラクタの呼び出し

        this.number;            //ばねの割り当て
        this.isFreeStart=false;  //左端が自由端
        this.isFreeEnd=true;    //右端が自由端
        this.rightSpring;       //右のばね
        this.leftSpring;        //左のばね

        this.isKinematic = true;//物理演算の影響を受けるか
        this.y = 300;           //オブジェクトのY座標
        this.mass = 1.0;        //オブジェクトの質量
        this.k = 0.9;           //ばねの強さ
        this.damp = 1;       //摩擦による減衰率
        this.velY = 0.0;        //Ｙ方向のスピード
        this.force = 0.0;       //ばねの合力
        this.accel = 0.0;       //加速度
        this.originY = 300;     //基準点

         // インタラクティブの設定
        this.addEventListener("mousedown", this.handleDown);
        this.addEventListener("pressmove", this.handleMove);
        this.addEventListener("pressup", this.handleUp);

        //形を定義
        this.graphics.beginFill("black").drawCircle(0, 0, 5);
    }

    UpdateForce(){
        //力の設定
        var forceOrigin = 0;
        var forceR = 0;
        var forceL = 0;

        if(this.rightSpring)forceR = (this.rightSpring.y - this.y);
        if(this.leftSpring) forceL = (this.leftSpring.y - this.y);

        //左端が固定端の場合
        if(!this.leftSpring&&!this.isFreeStart)forceOrigin = (this.originY - this.y);
        //右端が固定端の場合
        if(!this.RightSpring&&!this.isFreeEnd)forceOrigin = (this.originY - this.y);


        this.force = this.k * (forceOrigin + forceR + forceL);
    }

    move(){
        if(this.isKinematic){
            this.accel = this.force / this.mass;
            this.velY += this.accel;
            this.velY *= this.damp;
            this.y += this.velY;
        }
    }



    //オブジェクトが押されたとき
    handleDown(event){
        event.target.isKinematic = false; //物理演算の影響を受けないようにする
    }
    
    //オブジェクトがドラッグされたとき
    handleMove(event){
        event.target.isKinematic = false; //物理演算の影響を受けないようにする
        event.target.y = event.stageY;
    };

    //オブジェクトが離されたとき
    handleUp(event) {
        event.target.isKinematic = true; //物理演算の影響を受けるようにする
    }
}
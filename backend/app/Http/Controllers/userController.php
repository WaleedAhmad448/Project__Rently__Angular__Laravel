<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\Exceptions\JWTAuthException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Mail\ResetPasswordEmail;
use Illuminate\Support\Facades\Storage;

class userController extends Controller
{
    public function register(Request $request)
    {
        $user = User::where('email', $request['email'])->first();
        if ($user) {
            $response = 0;
            //$response = 'email already existe';
            //$response['code'] = 404;
        } else {
            $user = User::create([
                'First_name' => $request['First_name'],
                'Last_name' => $request['Last_name'],
                'email' => $request['email'],
                'password' => bcrypt($request['password']),
            ]);
            $response['status'] = 1;
            $response['message'] = 'register success';
            $response['code'] = 200;
        }
        return response()->json($response);
    }

    public function Login(Request $request)
    {
        $credentiala = $request->only('email','password');

        try {
            if (!JWTAuth::attempt($credentiala)){

                $response['status'] = 0;
                $response['code'] = 401;
                $response['data'] = null;
                $response['message'] = 'email or password incorrect';
                return response()->json($response);
            };
        }catch(JWTException $e) {

            $response['code'] = 500;
            $response['data'] = null;
            $response['message'] = 'email or password incorrect';
            return response()->json($response);
        };
        $user = auth()->user();
        $data['token'] = auth()->claims([
            'email' => $user->email,
            'user_id' => $user->id
        ])->attempt($credentiala);
        $response['status'] = 1;
        $response['code'] = 200;
        $response['data'] = $data;
        $response['message'] = 'login successful';
        return response()->json($response);
    }
    public function userinfo($id)
    {
        if(User::where('id',$id)->exists()){
            $user=User::where('id',$id)->get();  
            return response()->json($user);
        }else{
            return 0;
        }
    }
  
    public function updateUser(Request $request, $id)
    {
        if(User::where('id',$id)->exists()){
            $user =User::find($id);
            $picturs=Str::random().'.'.$request->Profile_picturs->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('Houses/image',$request->Profile_picturs,$picturs);
            $user->First_name =$request->First_name;
            $user->Last_name =$request->Last_name;
            $user->Address =$request->Address;
            $user->Gender =$request->Gender;
            $user->Nationality =$request->Nationality;
            $user->Profile_picturs =$picturs;
            $user->Phone_numer =$request->Phone_numer;
            
            $user->save();
            return response()->json([
                "message"=>"User updated successfully"
            ], 200);
        }else{
            return response()->json([
                "message"=>"User not found"
            ], 404);
        }
    }

    public function forgotPassword(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['error' => 'Email not found'], 404);
        }

        $token = Str::random(60);
        $this->savePasswordResetToken($user->email, $token);

        $resetLink = config('app.url') . '/reset-password?token=' . $token;

        //Mail::to($user->email)->send($resetLink);

        return response()->json(['message' => $resetLink]);
    }

    protected function savePasswordResetToken($email, $token)
    {
        DB::table('passwords_resets')->updateOrInsert(
            ['email' => $email],
            ['token' => $token, 'created_at' => now()]
        );
    }
    protected function ValidateToken(Request $request)
    {
        if(User::where('id',$request->user_id)->where('email',$request->email)->exists()){
            return response()->json("token is valid");
        }else{
            return response()->json("token is not valid");
        }
    }

}
